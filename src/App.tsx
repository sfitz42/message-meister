import React from 'react'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { AwsSender } from './forms/Aws/AwsSender'
import { ServiceBusSender } from './forms/ServiceBus/ServiceBusSender'

enum MessageBroker {
  Aws = "AWS SQS/SNS",
  ServiceBus = "Azure Service Bus",
}

export function App() {
  const [broker, setBroker] = React.useState(localStorage.getItem('provider') as MessageBroker || MessageBroker.Aws)

  const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBroker(event.target.value as MessageBroker)

    localStorage.setItem('provider', event.target.value)
  }

  return (
    <>
      <h1>MessageMeister 📢📩📬</h1>

      <div className="card">
        <select value={broker} onChange={handleProviderChange}>
          <option value={MessageBroker.Aws}>{MessageBroker.Aws}</option>
          <option value={MessageBroker.ServiceBus}>{MessageBroker.ServiceBus}</option>
        </select>

        {broker === MessageBroker.Aws && <AwsSender />}
        {broker === MessageBroker.ServiceBus && <ServiceBusSender />}
      </div>

      <Footer />
    </>
  )
}
