var ProductRow = React.createClass({
   render: function(){
       var name = this.props.product.name;
       var price = this.props.product.price;
       return (
           <tr>
               <td>{name}</td>
               <td>€{price}</td>
           </tr>
       )
   }
});

var ProductTable = React.createClass({
    productMatchesSearch: function(product){
        return product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase())!=-1;
    },
    render: function(){
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.products
                            .filter(this.productMatchesSearch)
                            .map(function(product){
                                return <ProductRow key={product.id} product={product}/>
                            })
                    }
                </tbody>
            </table>
        )
    }
});

var SearchBar = React.createClass({
    changeHandler: function(){
        this.props.inputCallback(this.refs.filterTextInput.value);
    },
    render: function(){
        return (
            <form>
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
    handleUserInput:function(filterText){
        this.setState({
            filterText: filterText
        });
    },
    getInitialState: function(){
        return {
            filterText: ''
        };
    },
    render: function(){
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inputCallback={this.handleUserInput}/>
                <ProductTable products={this.props.products} filterText={this.state.filterText}/>
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