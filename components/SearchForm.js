const SearchForm = ({ searchValue, onChangeSearchValue, onClickSearch}) => {
    return(
        <div>
            <form onSubmit={onClickSearch}>
                <input 
                    type="text" 
                    placeholder={"검색어를 입력해주세요."} 
                    value={searchValue} 
                    onChange={onChangeSearchValue}
                    
                />
                <button onClick={onClickSearch} >
                    검색
                </button>
            </form>
            
        </div>
    )
};

export default SearchForm;