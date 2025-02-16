import React from 'react'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { AwsMessageSender } from './forms/aws/Aws'
import { ServiceBusMessageSender } from './forms/service-bus/ServiceBus'

enum MessageBroker {
  AWS = "AWS SQS/SNS",
  ServiceBus = "Azure Service Bus",
}

export function App() {
  const [broker, setBroker] = React.useState(localStorage.getItem('provider') as MessageBroker || MessageBroker.AWS)

  const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBroker(event.target.value as MessageBroker)

    localStorage.setItem('provider', event.target.value)
  }

  return (
    <>
      <h1>MessageMeister 📢📩📬</h1>

      <div className="card">
        <select value={broker} onChange={handleProviderChange}>
          <option value={MessageBroker.AWS}>{MessageBroker.AWS}</option>
          <option value={MessageBroker.ServiceBus}>{MessageBroker.ServiceBus}</option>
        </select>

        {broker === MessageBroker.AWS && <AwsMessageSender />}
        {broker === MessageBroker.ServiceBus && <ServiceBusMessageSender />}
      </div>

      <Footer />
    </>
  )
}
