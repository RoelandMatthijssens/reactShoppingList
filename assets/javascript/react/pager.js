function expand(start, end){
    var result = [];
    while(start<=end){
        result.push(start);
        start++;
    }
    return result;
}

var Pager = React.createClass({
    generateClickHandler:function(pageNumber, props){
        return function(){
            props.pageClickCallback(pageNumber-1);
        }
    },
    generateStepHander:function(currentPage, props, offset){
        function withinBounds(min, i, max){
            return(Math.min(Math.max(min, i), max));
        }
        return function(){
            props.pageClickCallback(withinBounds(0, currentPage+offset, props.numberOfPages-1));
        }
    },
    slicePageNumbers:function(currentPage, numberOfPages){
        return expand(1, numberOfPages)
            .slice(Math.max(0, currentPage-2),
                   Math.min(numberOfPages, currentPage+3));
    },
    render: function(){
        return (
            <div className="pager">
                <a className="pagerPageNumber"
                   onClick={this.generateStepHander(this.props.currentPage, this.props, -1)}> &lt; </a>
                {
                    this.slicePageNumbers(this.props.currentPage, this.props.numberOfPages)
                        .map(function(pageNumber){
                            return <PageNumber key={"pagerPageId"+pageNumber}
                                               pageNumber={pageNumber}
                                               currentPage={this.props.currentPage}
                                               pageClickCallback={this.generateClickHandler(pageNumber, this.props)}
                            />
                        }.bind(this))
                }
                <a className="pagerPageNumber"
                   onClick={this.generateStepHander(this.props.currentPage, this.props, 1)}> &gt; </a>
            </div>
        )
    }
});

var PageNumber = React.createClass({
    render: function(){
        return <a className={(this.props.currentPage===this.props.pageNumber-1)?"pagerPageNumber active":"pagerPageNumber"}
                  onClick={this.props.pageClickCallback}>
            {this.props.pageNumber}
        </a>
    }
});

module.exports = Pager;