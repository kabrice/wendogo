import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'; 
import FormGroup from '@mui/material/FormGroup';

const CourseDomainFilter = React.memo(({ 
    myCourses,
    majorDetails, 
    checkedSubdomains, 
    onSubdomainCheck 
}) => {
    const [expandedDomains, setExpandedDomains] = useState(new Set());
    const filterMajorDetails = (majorDetails, myMajorIds) => {
        return majorDetails.map(domain => {
          // Filter children based on whether their major_ids intersect with myMajorIds
          const filteredChildren = domain.children.map(subdomain => {
            const filteredMajorIds = subdomain.major_ids.filter(majorId => myMajorIds.includes(majorId));
      
            // Return subdomain only if it has matching major_ids
            if (filteredMajorIds.length > 0) {
              return {
                ...subdomain,
                major_ids: filteredMajorIds
              };
            }
            return null; // Return null to remove subdomains with no matching major_ids
          }).filter(Boolean); // Remove null values
      
          // Return the domain only if it has filtered children
          if (filteredChildren.length > 0) {
            return {
              ...domain,
              children: filteredChildren
            };
          }
          return null; // Return null to remove domains with no matching children
        }).filter(Boolean); // Remove null values
      };
    const clickToDisplaySubdomains = (domain_id) => {
        setExpandedDomains(prev => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(domain_id)) {
                newExpanded.delete(domain_id);
            } else {
                newExpanded.add(domain_id);
            }
            return newExpanded;
        });
    };
        // Retrieve all majordIds in finalCoursesToDisplay and put the in majorIds as set
        let majorIds = new Set();
        myCourses.forEach(course => { majorIds.add(course.major_id)});
        majorIds = Array.from(majorIds);
        //console.log('coursesToDisplay xxx', majorIds)
        //setFinalMajorDetails(filterMajorDetails(majorDetails, majorIds));

        let filteredMajorDetails = filterMajorDetails(majorDetails, majorIds);

    return (        <div className="Stack stackColumn" style={{ flexDirection: "column", padding: 0, alignItems: "stretch" }}>

        {filteredMajorDetails && filteredMajorDetails.map((domain) => (
      <div className="Stack-child" style={{ paddingTop: 15, cursor: 'pointer' }} key={domain.domain_id} >
        <div className="Accordion">
          <div className="Stack pushLastItem stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "center" }} onClick={() => clickToDisplaySubdomains(domain.domain_id)}>
            <div className="Stack-child" style={{ paddingLeft: 0 }}>
              <div className="Stack  stackRow " style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
                <div className="Stack-child" style={{ paddingLeft: 0 }}>
                  <div className="Checkbox FilterCheckbox after  no-margin" data-testid="filter-checkbox-assistance_accident">
                    <span htmlFor={domain.domain_name} className=""><b> {domain.domain_name} </b></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="Stack-child" style={{ paddingLeft: 0 }}> 
              <div className="icon-wrapper" style={{ color: "rgb(172, 186, 200)", marginBottom:10, transform: `scale(${(1 === true) ? -1 : 1})` }}>
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
                  <path d="M27.785 15.75l-.562-.53a.829.829 0 00-1.123 0l-6.592 6.226-6.59-6.226a.823.823 0 00-1.124 0l-.561.53a.721.721 0 000 1.061l7.714 7.286c.149.141.35.22.561.22a.82.82 0 00.563-.22l7.714-7.286a.73.73 0 00.233-.531.73.73 0 00-.233-.53" fillRule="evenodd" /> 
                </svg>
              </div>
            </div>
          </div>
        {/* Display children (subdomains) if the selected domain matches */} 
            {expandedDomains.has(domain.domain_id) && domain.children.map((subdomain) => (
                <> {subdomain.major_ids.join(', ')}
                    <FormGroup  style={{ marginLeft: 10 }}  key={subdomain.subdomain_id}  >
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={checkedSubdomains.has(subdomain.subdomain_id)}
                                    onChange={() => onSubdomainCheck(subdomain.major_ids, subdomain.subdomain_id)}
                                />
                            }
                            label={subdomain.subdomain_name}
                        />
                    </FormGroup></>
                ))}
        </div>
      </div>
    ))}</div>);
});

export default CourseDomainFilter;
