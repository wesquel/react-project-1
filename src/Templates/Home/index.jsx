import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';

import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {

  state = {
    posts:[],
    allPosts: [],
    page: 0,
    postsPerPage: 15,
    searchValue: ""
  }

  async componentDidMount(){
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postAndPhotos = await loadPosts();
    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {page,postsPerPage,allPosts,posts} = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage+postsPerPage);
    posts.push(...nextPosts);
    this.setState({posts, page:nextPage})
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value})
    console.log(value)
  }

  render(){

    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) 
    : posts;

    return(
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h2>Search value: {searchValue}</h2>
          )}  

          <TextInput
          searchValue={searchValue}
          handleChange={this.handleChange}
          />
        </div>
      
        
        {filteredPosts.length > 0 && (
         <Posts posts={filteredPosts}/> 
        )}

        {filteredPosts.length === 0 && (
         <p>Nada encontrado</p>
        )}
        
        {!searchValue && (
          <div className="button-container">
            <Button 
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />  
          </div>
        )}
        
      </section>
      
    );
  }
}

export default Home;
