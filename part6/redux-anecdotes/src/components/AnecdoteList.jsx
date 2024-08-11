import { useDispatch, useSelector } from "react-redux";
import { createAnecdote, voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  //const anecdotes = useSelector(state => state.anecdotes)

  //useSelector(state => state.anecdotes.map((anecdote) => console.log("anecdote", anecdote)))

  const anecdotes = useSelector((state) => state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())));
  

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
