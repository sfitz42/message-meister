import React from 'react'
import './App.css'
import { Footer } from './components/Footer/Footer'
import { AwsSender } from './forms/Aws/AwsSender'
import { ServiceBusSender } from './forms/ServiceBus/ServiceBusSender'
import { SelectList } from './components/SelectList/SelectList'

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
        <SelectList name="provider" options={Object.values(MessageBroker)} onChange={handleProviderChange} />

        {broker === MessageBroker.Aws && <AwsSender />}
        {broker === MessageBroker.ServiceBus && <ServiceBusSender />}
      </div>

      <Footer />
    </>
  )
}
