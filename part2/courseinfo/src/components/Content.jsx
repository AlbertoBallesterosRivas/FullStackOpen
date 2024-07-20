import Part from './Part'

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
    {parts.map(part => <Part part={part} key={part.id} />)}
    
    <p>total of {total} exercises</p>
    </>
  );
};

export default Content;
