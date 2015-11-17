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
    render: function(){
        return (
            <div className="pager">
                <a className="pagerPageNumber"> &lt; </a>
                {
                expand(1, this.props.numberOfPages)
                    .map(function(pageNumber){
                        return <a className="pagerPageNumber"
                                  key={"pagerPageId"+pageNumber}>
                            {pageNumber}
                        </a>
                    })
            }
                    <a className="pagerPageNumber"> &gt; </a>
            </div>
        )
    }
});

var ProductTable = React.createClass({
    productMatchesSearch: function(product){
        return product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase())!=-1;
    },
    calculateAmountOfPages: function(){
        return Math.ceil(this.props.products.length/this.props.pageSize);
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
                            this.props.products
                                .filter(this.productMatchesSearch)
                                .slice(this.props.currentPage*this.props.pageSize, (1+this.props.currentPage)*this.props.pageSize)
                                .map(function(product){
                                    return <ProductRow key={product.id} product={product}/>
                                })
                        }
                    </tbody>
                </table>
                <Pager numberOfPages={this.calculateAmountOfPages()} />
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
            filterText: filterText
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
                />
            </div>
        );
    }
});

$.getJSON("products.json", function(data){
    ReactDOM.render(
        <FilterableProductTable products={data}/>,
        document.getElementById("container")
    );
});