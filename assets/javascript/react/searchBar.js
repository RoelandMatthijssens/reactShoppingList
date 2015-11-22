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

module.exports = SearchBar;
