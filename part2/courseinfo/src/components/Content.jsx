import Part from './Part'

const Content = ({ parts }) => {
  return (
    <>
    {parts.map(part => <Part part={part} key={part.id} />)}
    
    <p>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
    </>
  );
};

export default Content;
