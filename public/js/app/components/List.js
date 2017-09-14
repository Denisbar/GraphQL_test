class List extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultId: 0,
            id:'',
            title: '',
            list: [],
            rating: ''
        };
        this.update = this.update.bind(this);
    }

    render() {
        //Style
        const divStyle = {
            padding: '10px'
        };
        return (
            <div className="container">
                <h2>Search car model in a list of cars</h2>
                <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>List</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.id}</td>
                        <td>{this.state.title}</td>
                        <td>{this.state.list[0]},{this.state.list[1]}</td>
                        <td>{this.state.rating}</td>
                    </tr>
                </tbody>
                </table>
                <div style={divStyle}>Search car by ID from 0 to 9</div>
                <form>
                    <input type="text" id="searchBox" className="form-control" placeholder="Type ID from 0 to 9"
                        maxLength="1" 
                        onChange={this.update}/>
                </form>
            </div>
        );
    }

    componentDidMount() {
        this.getCarByIdNumber();
    }
// Update data
    update( e ){
        if(parseInt(e.target.value) < 10 || isNaN(parseInt(e.target.value))){ 
            this.setState({defaultId: e.target.value}, () => {
                this.getCarByIdNumber(this.state.defaultId);
            }); 
            }else{
                return 0;
        }
    }
// Get data
    getCarByIdNumber(number = this.state.defaultId){
        try {
            let url = 'http://localhost:4000/graphql?query={id(num:'+number+'),title(num:'+number+'),list(num:'+number+',arrNum:'+number+'),rating(num:'+number+')}';
            return fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({id: res.data.id});
                this.setState({title: res.data.title});
                this.setState({list: res.data.list});
                this.setState({rating: res.data.rating});
            });
        }catch (e){
            alert(e.name);
        }
    }
}
