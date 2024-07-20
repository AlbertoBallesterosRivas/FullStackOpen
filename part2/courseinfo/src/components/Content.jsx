import Part from './Part'

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
    {parts.map(part => <Part part={part} key={part.id} />)}
    
    <b>total of {total} exercises</b>
    </>
  );
};

export default Content;
