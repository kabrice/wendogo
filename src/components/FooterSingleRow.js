'use client';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const FooterSingleRow = () => {
    const { t } = useTranslation('common');
    return (
      <footer className="footerSingleRow undefined pp-cons-1djyuxb-container_fluid" data-ppui-info="grid_3.2.9">
      <div className="pp-cons-1v26bvb-row-justify_content_center" data-ppui-info="grid_3.2.9" style={{ alignItems: "center" }}>
        <div className="pp-cons-e1de2j-col_sm_12" align="center" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }} data-ppui="true">
          <span className="pp-cons-151vsl0-text_caption" data-ppui-info="caption-text_6.5.1" style={{ color: "#545d68", marginRight: "0.25rem" }}> © 2025 Wendogo </span>
          <Link className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" href="/privacy" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
            <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> {t('footer.privacy')} </span>
          </Link>
          <Link href="/"  className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
            <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> {t('footer.cookies')} </span>
          </Link>
          <Link  className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" href="/cgu" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
            <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> {t('footer.termsOfService')} </span>
          </Link>
          <Link className="pp-cons-19otlvw-links_base-text_body_strong-secondary-text_body_strong" data-ppui-info="links_4.3.3" href="/contact" target="_blank" style={{ color: "#000000", padding: "0 0.15rem", margin: "0 0.15rem" }} rel="noreferrer noopener" pa-marked={1}>
            <span className="pp-cons-1dky7y7-text_caption_strong" data-ppui-info="caption-text_6.5.1" style={{ lineHeight: "1.5rem" }}> {t('footer.contact')} </span>
          </Link>
        </div>
      </div>
    </footer>
    )
};

export default FooterSingleRow;
