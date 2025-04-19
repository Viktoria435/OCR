import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

interface ScenarioProps {
    scenario?: string | null;
}

const Scenario: React.FC<ScenarioProps> = ({ scenario }) => {
  return (
    <div className="max-h-[66vh] p-2 m-4 w-2xl overflow-y-auto text-justify scenario">
      {scenario ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{scenario}</ReactMarkdown> : <div>No scenario available</div>}
    </div>
  );
};

export default Scenario;
