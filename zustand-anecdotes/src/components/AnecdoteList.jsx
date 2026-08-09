import { useNotificationActions } from "../notificationStore";
import { useAnecdoteActions, useSortedAnecdotes } from "../store";

const AnecdoteList = () => {
  const sortedAnecdotes = useSortedAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const { setNotification, clearNotification } = useNotificationActions();

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
