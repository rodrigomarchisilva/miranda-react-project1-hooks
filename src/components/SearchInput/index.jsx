import P from 'prop-types';
import './style.css';

export const SearchInput = ({ value, onChange }) => (
  <input
    className="search-input"
    type="search"
    value={ value }
    onChange={ onChange }
    placeholder="Type your search"
  />
);

SearchInput.propTypes = {
  value: P.string.isRequired,
  onChange: P.func.isRequired,
};
