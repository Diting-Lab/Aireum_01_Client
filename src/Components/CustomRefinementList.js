import React from 'react';

import cxComponent from './cxComponent';

function CustomRefinementList({ items, refine }) {
  // const { items, refine } = useRefinementList(props);

  return (
    <div className="ais-RefinementList">
      <ul className="ais-RefinementList-list">
        {items.map((item) => (
          <li
            key={item.value}
            className={cxComponent(
              'ais-RefinementList-item',
              item.isRefined && 'ais-RefinementList-item--selected'
            )}
          >
            <label className="ais-RefinementList-label">
              <input
                className="ais-RefinementList-checkbox"
                type="checkbox"
                value={item.value}
                checked={item.isRefined}
                onChange={() => refine(item.value)}
              />
              <span className="ais-RefinementList-labelText">{item.label}</span>
              <span className="ais-RefinementList-count">{item.count}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomRefinementList;
