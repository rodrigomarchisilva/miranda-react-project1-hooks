import './style.css';
import { useState, useEffect, useCallback } from 'react';
import { Posts } from '../../components/Posts';
import { fetchPosts } from '../../utils/fetchPosts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState('');

  const loadPosts = useCallback(async() => {
    const posts = await fetchPosts();
    setAllPosts(posts);
    setPosts(posts.slice(0, postsPerPage));
  }, [postsPerPage]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const addPosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

 const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  const filterPosts = (post) => (
    post.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
  );

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = searchValue ? allPosts.filter(filterPosts) : posts;
  
  if (!posts) { return <div>Loading...</div>; }

  return (
    <section className="container" data-testid="container">
      { searchValue && <h1>Search value: { searchValue }</h1> }
      <SearchInput value={ searchValue } onChange={ handleSearch } />
      {
        !filteredPosts.length
          ? <div>{ 'No posts found =(' }</div>
          : (
            <>
              <Posts posts={ filteredPosts } />
              <Button
                text="Show more posts"
                onClick={ addPosts }
                disabled={ noMorePosts }
              />
            </>
          )
      }
    </section>
  );
}
