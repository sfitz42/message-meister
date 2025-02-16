import './App.css'
import { Footer } from './components/Footer/Footer'
import { AwsMessageSender } from './forms/aws/Aws'

export function App() {
  return (
    <>
      <h1>MessageMeister 📢📩📬</h1>
      <div className="card">
        <select>
          <option value="AWS">AWS SQS/SNS</option>
        </select>

        <AwsMessageSender />
      </div>
      <Footer />
    </>
  )
}
