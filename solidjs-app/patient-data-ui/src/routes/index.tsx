import { Title } from "@solidjs/meta"
import PatientDataRetriever from "~/components/PatientDataRetriever";

export default function Home() {
  
  return (
    <main>
      <Title>Demo App</Title>
      <h1>Demo App</h1>
      <PatientDataRetriever />
    </main>
  );
}
