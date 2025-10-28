import React, { useState, useMemo } from 'react';
import { Upload, Search, Filter, Eye, EyeOff, Download, FileSpreadsheet } from 'lucide-react';

const CSVViewer = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumns, setSelectedColumns] = useState(new Set());
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Colonnes contenant du HTML
  const htmlColumns = [
    'y1_admission_details',
    'application_details_for_year_2', 
    'application_details_for_year_3',
    'application_details_for_year_4',
    'application_details_for_year_5',
    'special_comment',
    'address'
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) return;

      const headerLine = lines[0];
      const parsedHeaders = parseCSVLine(headerLine);
      setHeaders(parsedHeaders);
      setSelectedColumns(new Set(parsedHeaders));

      const data = lines.slice(1).map((line, index) => {
        const values = parseCSVLine(line);
        const row = { _id: index };
        parsedHeaders.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        return row;
      });

      setCsvData(data);
    };

    reader.readAsText(file);
  };

  const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ';' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return csvData;
    
    return csvData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [csvData, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleColumn = (column) => {
    setSelectedColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(column)) {
        newSet.delete(column);
      } else {
        newSet.add(column);
      }
      return newSet;
    });
  };

  const toggleRowExpansion = (rowId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const renderCellContent = (value, column) => {
    if (!value) return <span className="text-gray-400">-</span>;

    if (htmlColumns.includes(column)) {
      return (
        <div className="max-w-md">
          <div 
            className="prose prose-sm max-w-none text-sm leading-tight"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      );
    }

    if (value.toString().startsWith('http')) {
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {value}
        </a>
      );
    }

    return <span className="text-sm">{value}</span>;
  };

  const visibleColumns = headers.filter(header => selectedColumns.has(header));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <FileSpreadsheet className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Visualiseur CSV - Formations Etudes en France
              </h1>
            </div>
            {csvData.length > 0 && (
              <div className="text-sm text-gray-500">
                {csvData.length} formations • {visibleColumns.length}/{headers.length} colonnes
              </div>
            )}
          </div>

          {/* File Upload */}
          {csvData.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-lg font-medium text-gray-900">
                    Télécharger votre fichier CSV
                  </span>
                  <p className="mt-2 text-sm text-gray-500">
                    Glissez-déposez ou cliquez pour sélectionner
                  </p>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher dans toutes les colonnes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Reset Upload */}
              <label htmlFor="file-upload-new" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Nouveau fichier
              </label>
              <input
                id="file-upload-new"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </div>
          )}
        </div>

        {csvData.length > 0 && (
          <>
            {/* Column Selector */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Colonnes visibles:</span>
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {headers.map(header => (
                  <button
                    key={header}
                    onClick={() => toggleColumn(header)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedColumns.has(header)
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                  >
                    {selectedColumns.has(header) ? (
                      <Eye className="inline h-3 w-3 mr-1" />
                    ) : (
                      <EyeOff className="inline h-3 w-3 mr-1" />
                    )}
                    {header}
                    {htmlColumns.includes(header) && (
                      <span className="ml-1 text-orange-600">🏷️</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                    {visibleColumns.map(header => (
                      <th
                        key={header}
                        onClick={() => handleSort(header)}
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-1">
                          <span>{header}</span>
                          {htmlColumns.includes(header) && (
                            <span className="text-orange-600">🏷️</span>
                          )}
                          {sortConfig.key === header && (
                            <span className="text-blue-600">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((row, index) => (
                    <tr 
                      key={row._id} 
                      className={`hover:bg-gray-50 ${expandedRows.has(row._id) ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => toggleRowExpansion(row._id)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {expandedRows.has(row._id) ? '▼ Réduire' : '▶ Développer'}
                        </button>
                      </td>
                      {visibleColumns.map(header => (
                        <td 
                          key={header} 
                          className={`px-3 py-4 text-sm text-gray-900 ${
                            expandedRows.has(row._id) ? 'max-w-none' : 'max-w-xs'
                          }`}
                        >
                          <div className={expandedRows.has(row._id) ? '' : 'truncate'}>
                            {renderCellContent(row[header], header)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, sortedData.length)} sur {sortedData.length} résultats
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Précédent
                  </button>
                  
                  <div className="flex space-x-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 text-sm rounded ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CSVViewer;
