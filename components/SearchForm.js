import { Input } from 'antd';
const SearchForm = ({ searchValue, onChangeSearchValue, onClickSearch}) => {
    return(
        <div>
            <form onSubmit={onClickSearch}>
                <Input.Search
                    placeholder={"검색어를 입력해주세요."} 
                    value={searchValue} 
                    onChange={onChangeSearchValue}
                    enterButton="Search"
                    size="default"
                    onSearch={onClickSearch}
                />
            </form>
            
        </div>
    )
};

export default SearchForm;