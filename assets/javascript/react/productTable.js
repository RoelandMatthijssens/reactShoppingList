function expand(start, end){
    var result = [];
    while(start<=end){
        result.push(start);
        start++;
    }
    return result;
}

var ProductRow = React.createClass({
   render: function(){
       var id = this.props.product.id;
       var name = this.props.product.name;
       var price = this.props.product.price;
       return (
           <tr className="productRow">
               <td className="productID">{id}</td>
               <td className="productName">{name}</td>
               <td className="productPrice">€{price}</td>
           </tr>
       )
   }
});

var Pager = React.createClass({
    generateClickHandler:function(pageNumber, props){
        return function(){
            props.pageClickCallback(pageNumber-1);
        }
    },
    render: function(){
        return (
            <div className="pager">
                <a className="pagerPageNumber"> &lt; </a>
                {
                expand(1, this.props.numberOfPages)
                    .map(function(pageNumber){
                        return <PageNumber key={"pagerPageId"+pageNumber}
                                           pageNumber={pageNumber}
                                           pageClickCallback={this.generateClickHandler(pageNumber, this.props)}
                        />
                    }.bind(this))
                }
                <a className="pagerPageNumber"> &gt; </a>
            </div>
        )
    }
});

var PageNumber = React.createClass({
    render: function(){
        return <a className="pagerPageNumber"
            onClick={this.props.pageClickCallback}>
            {this.props.pageNumber}
        </a>
    }
});

var ProductTable = React.createClass({
    productMatchesSearch: function(product){
        return product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase())!=-1;
    },
    calculateAmountOfPages: function(){
        return Math.ceil(this.getFilteredProducts().length/this.props.pageSize);
    },
    getFilteredProducts:function(){
        return this.props.products
            .filter(this.productMatchesSearch);
    },
    render: function(){
        return (
            <div className="productTable">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.getFilteredProducts()
                                .slice(this.props.currentPage*this.props.pageSize, (1+this.props.currentPage)*this.props.pageSize)
                                .map(function(product){
                                    return <ProductRow key={product.id} product={product}/>
                                })
                        }
                    </tbody>
                </table>
                <Pager numberOfPages={this.calculateAmountOfPages()}
                       pageClickCallback={this.props.pageClickCallback}/>
            </div>
        )
    }
});

var SearchBar = React.createClass({
    changeHandler: function(){
        this.props.inputCallback(this.refs.filterTextInput.value);
    },
    render: function(){
        return (
            <form className="searchBar">
                <input type="text"
                       ref="filterTextInput"
                       placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.changeHandler}
                />
            </form>
        );

    }
});

var FilterableProductTable = React.createClass({
    handleSearch:function(filterText){
        this.setState({
            filterText: filterText,
            currentPage:0
        });
    },
    handlePageClick:function(pageNumber){
        this.setState({
            filterText: this.state.filterText,
            currentPage:pageNumber
        });
    },
    getInitialState: function(){
        return {
            filterText: '',
            currentPage:0
        };
    },
    render: function(){
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inputCallback={this.handleSearch}/>
                <ProductTable products={this.props.products}
                              filterText={this.state.filterText}
                              currentPage={this.state.currentPage}
                              pageSize="9"
                              pageClickCallback={this.handlePageClick}
                />
            </div>
        );
    }
});

module.exports = {
    FilterableProductTable: FilterableProductTable
};