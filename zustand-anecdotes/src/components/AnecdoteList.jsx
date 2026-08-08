import { useNotificationActions } from "../notificationStore";
import { useAnecdoteActions, useAnecdotes, useFilter } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const filter = useFilter();
  const { setNotification, clearNotification } = useNotificationActions();

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );

  const sortedAnecdotes = filteredAnecdotes.toSorted(
    (a, b) => b.votes - a.votes,
  );
  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                vote(anecdote.id);
                setNotification(`You voted '${anecdote.content}'`);
                setTimeout(() => clearNotification(), 5000);
              }}
            >
              vote
            </button>
            {anecdote.votes === 0 && (
              <button
                onClick={() => {
                  remove(anecdote.id);
                  setNotification(`You deleted '${anecdote.content}'`);
                  setTimeout(() => clearNotification(), 5000);
                }}
              >
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
