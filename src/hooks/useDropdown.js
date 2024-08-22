import { useState } from 'react';

const useDropdown = (initialState) => {
    const [selected, setSelected] = useState(initialState);
    const [collapsed, setCollapsed] = useState(true);

    const updateSelected = (item) => {
        setSelected({ ...item, validated: true });
        setCollapsed(true);
    };

    return [selected, collapsed, updateSelected, setCollapsed];
};

export default useDropdown;
