#!/usr/bin/env python3
"""
Script de nettoyage des images originales après conversion WebP
Supprime les fichiers originaux (.jpg, .jpeg, .png, .gif) et garde uniquement les .webp
Vérifie la présence des sauvegardes avant suppression
"""

import os
import sys
from pathlib import Path
import argparse
from typing import List, Tuple

class ImageCleaner:
    def __init__(self, target_dir: str, backup_dir: str = None, force: bool = False):
        """
        Initialise le nettoyeur d'images
        
        Args:
            target_dir (str): Dossier contenant les images à nettoyer
            backup_dir (str): Dossier de sauvegarde (optionnel, auto-détecté)
            force (bool): Forcer la suppression sans confirmation
        """
        self.target_dir = Path(target_dir)
        self.backup_dir = Path(backup_dir) if backup_dir else self.target_dir / 'backup_originals'
        self.force = force
        
        # Extensions à supprimer
        self.original_formats = {'.jpg', '.jpeg', '.png', '.gif'}
        
        # Statistiques
        self.stats = {
            'found_originals': 0,
            'found_webp': 0,
            'found_backups': 0,
            'deleted': 0,
            'errors': 0,
            'space_freed': 0,
            'files_deleted': []
        }
    
    def find_original_images(self) -> List[Path]:
        """Trouve toutes les images originales"""
        images = []
        for ext in self.original_formats:
            images.extend(self.target_dir.rglob(f'*{ext}'))
            images.extend(self.target_dir.rglob(f'*{ext.upper()}'))
        return sorted(images)
    
    def find_webp_images(self) -> List[Path]:
        """Trouve toutes les images WebP"""
        webp_images = []
        webp_images.extend(self.target_dir.rglob('*.webp'))
        webp_images.extend(self.target_dir.rglob('*.WEBP'))
        return sorted(webp_images)
    
    def check_webp_exists(self, original_path: Path) -> bool:
        """Vérifie si la version WebP existe"""
        webp_path = original_path.with_suffix('.webp')
        return webp_path.exists()
    
    def check_backup_exists(self, original_path: Path) -> bool:
        """Vérifie si la sauvegarde existe"""
        try:
            relative_path = original_path.relative_to(self.target_dir)
            backup_path = self.backup_dir / relative_path
            return backup_path.exists()
        except ValueError:
            # Le fichier n'est pas dans target_dir
            return False
    
    def format_size(self, size_bytes: int) -> str:
        """Formate la taille en unités lisibles"""
        for unit in ['B', 'KB', 'MB', 'GB']:
            if size_bytes < 1024:
                return f"{size_bytes:.1f} {unit}"
            size_bytes /= 1024
        return f"{size_bytes:.1f} TB"
    
    def analyze_directory(self) -> Tuple[List[Path], List[Path], List[Path]]:
        """Analyse le dossier et catégorise les fichiers"""
        original_images = self.find_original_images()
        webp_images = self.find_webp_images()
        
        self.stats['found_originals'] = len(original_images)
        self.stats['found_webp'] = len(webp_images)
        
        # Classer les originaux
        safe_to_delete = []  # Ont WebP ET sauvegarde
        has_webp_no_backup = []  # Ont WebP mais pas de sauvegarde
        no_webp = []  # Pas de WebP du tout
        
        for original in original_images:
            has_webp = self.check_webp_exists(original)
            has_backup = self.check_backup_exists(original)
            
            if has_webp and has_backup:
                safe_to_delete.append(original)
                self.stats['found_backups'] += 1
            elif has_webp and not has_backup:
                has_webp_no_backup.append(original)
            else:
                no_webp.append(original)
        
        return safe_to_delete, has_webp_no_backup, no_webp
    
    def delete_file(self, file_path: Path) -> bool:
        """Supprime un fichier en toute sécurité"""
        try:
            file_size = file_path.stat().st_size
            file_path.unlink()
            
            self.stats['deleted'] += 1
            self.stats['space_freed'] += file_size
            self.stats['files_deleted'].append(str(file_path))
            
            print(f"🗑️  Supprimé: {file_path.name} ({self.format_size(file_size)})")
            return True
            
        except Exception as e:
            print(f"❌ Erreur suppression {file_path.name}: {e}")
            self.stats['errors'] += 1
            return False
    
    def print_analysis(self, safe_to_delete, has_webp_no_backup, no_webp):
        """Affiche l'analyse du dossier"""
        print("\n" + "="*60)
        print("🔍 ANALYSE DU DOSSIER")
        print("="*60)
        
        print(f"📁 Dossier analysé: {self.target_dir}")
        print(f"💾 Dossier de sauvegarde: {self.backup_dir}")
        print(f"📸 Images originales trouvées: {self.stats['found_originals']}")
        print(f"🌐 Images WebP trouvées: {self.stats['found_webp']}")
        print(f"💼 Sauvegardes trouvées: {self.stats['found_backups']}")
        
        print(f"\n✅ Sûrs à supprimer (WebP + sauvegarde): {len(safe_to_delete)}")
        print(f"⚠️  WebP sans sauvegarde: {len(has_webp_no_backup)}")
        print(f"❌ Pas de WebP: {len(no_webp)}")
        
        if has_webp_no_backup:
            print(f"\n⚠️  ATTENTION - Images avec WebP mais sans sauvegarde:")
            for img in has_webp_no_backup[:5]:  # Limiter l'affichage
                print(f"   • {img.name}")
            if len(has_webp_no_backup) > 5:
                print(f"   ... et {len(has_webp_no_backup) - 5} autres")
        
        if no_webp:
            print(f"\n❌ ATTENTION - Images sans WebP (ne seront PAS supprimées):")
            for img in no_webp[:5]:  # Limiter l'affichage
                print(f"   • {img.name}")
            if len(no_webp) > 5:
                print(f"   ... et {len(no_webp) - 5} autres")
    
    def print_summary(self):
        """Affiche le résumé du nettoyage"""
        print("\n" + "="*60)
        print("📊 RÉSUMÉ DU NETTOYAGE")
        print("="*60)
        
        print(f"🗑️  Fichiers supprimés: {self.stats['deleted']}")
        print(f"❌ Erreurs: {self.stats['errors']}")
        print(f"💾 Espace libéré: {self.format_size(self.stats['space_freed'])}")
        
        if self.stats['deleted'] > 0:
            print(f"\n📂 Fichiers supprimés:")
            for file_path in self.stats['files_deleted'][:10]:  # Limiter l'affichage
                print(f"   • {Path(file_path).name}")
            
            if len(self.stats['files_deleted']) > 10:
                print(f"   ... et {len(self.stats['files_deleted']) - 10} autres")
    
    def confirm_deletion(self, files_to_delete: List[Path]) -> bool:
        """Demande confirmation avant suppression"""
        if self.force:
            return True
        
        if not files_to_delete:
            print("\n✅ Aucun fichier à supprimer!")
            return False
        
        total_size = sum(f.stat().st_size for f in files_to_delete)
        
        print(f"\n🚨 CONFIRMATION REQUISE")
        print(f"Vous allez supprimer {len(files_to_delete)} fichier(s)")
        print(f"Espace qui sera libéré: {self.format_size(total_size)}")
        print(f"\n⚠️  Cette action est IRRÉVERSIBLE!")
        print(f"✅ Les sauvegardes sont dans: {self.backup_dir}")
        
        while True:
            response = input(f"\nContinuer? (oui/non): ").lower().strip()
            if response in ['oui', 'o', 'yes', 'y']:
                return True
            elif response in ['non', 'n', 'no']:
                return False
            else:
                print("Réponse invalide. Tapez 'oui' ou 'non'.")
    
    def clean_directory(self):
        """Nettoie le dossier"""
        print(f"🧹 NETTOYAGE DES IMAGES ORIGINALES")
        print(f"📁 Dossier: {self.target_dir}")
        
        if not self.target_dir.exists():
            print(f"❌ Erreur: Le dossier {self.target_dir} n'existe pas!")
            return False
        
        if not self.backup_dir.exists():
            print(f"⚠️  Attention: Le dossier de sauvegarde {self.backup_dir} n'existe pas!")
            if not self.force:
                response = input("Continuer quand même? (oui/non): ").lower().strip()
                if response not in ['oui', 'o', 'yes', 'y']:
                    print("❌ Nettoyage annulé.")
                    return False
        
        # Analyse
        safe_to_delete, has_webp_no_backup, no_webp = self.analyze_directory()
        self.print_analysis(safe_to_delete, has_webp_no_backup, no_webp)
        
        # Confirmation
        if not self.confirm_deletion(safe_to_delete):
            print("❌ Nettoyage annulé.")
            return False
        
        # Suppression
        print(f"\n🚀 Début du nettoyage...")
        
        for file_path in safe_to_delete:
            self.delete_file(file_path)
        
        # Résumé
        self.print_summary()
        
        if self.stats['errors'] == 0:
            print(f"\n🎉 Nettoyage terminé avec succès!")
        else:
            print(f"\n⚠️  Nettoyage terminé avec {self.stats['errors']} erreur(s).")
        
        return True

def main():
    parser = argparse.ArgumentParser(
        description="Supprime les images originales après conversion WebP",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples d'utilisation:
  python cleanup_originals.py ./images/schools
  python cleanup_originals.py ./images --backup ./backup_originals
  python cleanup_originals.py ./images --force
        """
    )
    
    parser.add_argument('target_dir', 
                       help='Dossier contenant les images à nettoyer')
    
    parser.add_argument('--backup', '-b',
                       help='Dossier de sauvegarde (défaut: target_dir/backup_originals)')
    
    parser.add_argument('--force', '-f', action='store_true',
                       help='Forcer la suppression sans confirmation')
    
    parser.add_argument('--dry-run', action='store_true',
                       help='Simuler sans supprimer (analyse seulement)')
    
    args = parser.parse_args()
    
    # Création du nettoyeur
    cleaner = ImageCleaner(
        target_dir=args.target_dir,
        backup_dir=args.backup,
        force=args.force
    )
    
    if args.dry_run:
        print("🔍 MODE SIMULATION (aucune suppression)")
        safe_to_delete, has_webp_no_backup, no_webp = cleaner.analyze_directory()
        cleaner.print_analysis(safe_to_delete, has_webp_no_backup, no_webp)
        return
    
    # Nettoyage
    success = cleaner.clean_directory()
    
    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()
