import { useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";
const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { setNotification, clearNotification } = useNotificationActions();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    await add(content);
    setNotification(`You created '${content}'`);
    setTimeout(() => clearNotification(), 5000);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
