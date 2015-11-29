var SearchBar = require('./searchBar');
var Pager = require('./pager');
var ActionButtonsContainer = React.createClass({
    render: function(){
        return (
            <div className="actionButtonsContainer">
                <EditButton/>
                <RemoveButton/>
            </div>
        )
    }
});

var RemoveButton = React.createClass({
    render: function(){
        return (
            <i className="fa fa-trash actionButton"></i>
        )
    }
});

var EditButton = React.createClass({
    render: function(){
        return (
            <i className="fa fa-pencil actionButton"></i>
        )
    }
});


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
               <td>
                   <ActionButtonsContainer/>
               </td>
           </tr>
       )
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
                            <th>Actions</th>
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
                       currentPage = {this.props.currentPage}
                       pageClickCallback={this.props.pageClickCallback}/>
            </div>
        )
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

module.exports = FilterableProductTable;