import { Component } from 'react';
import './App.css';
import memberData from './data/data';
import CardList from './components/card-list/card-list';
import SearchBox from './components/search-box/search-box';
import Main from './components/main/main';
import {useState, useEffect} from 'react';

/*
 * pure func - no side effects (func create effect outside of its scope) 
 * Functional components create impure func
 * React rerun the FULL function top to bottom - when props change/state changes
 */
const App = () => {
  const [searchField, setSearchField] = useState(''); //react hooks [value, setValue]
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState(members);

  //setMembers(memberData); --infinite re-rendering! A diff array each time
  useEffect(() => {
    setMembers(memberData);
  }, []); //run callback func if anything change in dependency arrays
  //empty array means only run onMount :)

  //effect fired only if those depnendencies change
  useEffect(() => {
    const newFilteredMembers = members.filter((member) => {
      return member.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMembers(newFilteredMembers);
  }, [members, searchField]);

  const onSearchChange = (event)=> {
    //create a new array for filtered result
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };


  return <div className="App">
    <h1 className="app-title">Running Man Rolodex</h1>
    <Main />
    <SearchBox className='members-search-box' onChangeHandler={onSearchChange} placeholder='search members' />
    <CardList members={filteredMembers}/>
  </div>
}

export default App;

/*
CLASS-BASED COMPONENTS
TOP DOWN rendering
Order: constructor -> render -> componentDidMount -> render
New state obj in memory -> React re-renders
changing props also cause rerender!
Components rerender when setState called or props are updated
*/
/*
class App extends Component {
  constructor() {
    super();

    this.state = {
      members: [],
      searchField: ''
    };
  }

  //happens once at the start
  componentDidMount() {
    this.setState(() => {return {members: memberData}}); //API calls should be made here
  }

  //Optimisation: don't use anon func else it will be created ea time, use this so it's created once only
  onSearchChange = (event)=> {
    //create a new array for filtered result
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {return {searchField}});
  };


  render() {
    const {members, searchField}  = this.state;
    const {onSearchChange} = this;

    const filteredMembers = members.filter((member) => {
      return member.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Running Man Rolodex</h1>
        <SearchBox className='members-search-box' onChangeHandler={onSearchChange} placeholder='search members'/>
       <CardList members={filteredMembers}/>
      </div>
    );
  }
}

export default App;
*/

/*
   <button onClick={() => {
           this.setState({name: 'Yun Qing'}) //shallow merge, new object in memory -> invokes rerendering
         }}>

         OR

    <button onClick={() => {
           this.setState(() => {
             return {name: 'Yun Qing'};
           }, 
           () => {
             console.log(this.state); //callback func run after state updates
           });
         }}>
 */
