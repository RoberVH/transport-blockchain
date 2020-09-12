CREATED ON AUGUST/SEPTEMBER  2018

<h1>Transport of Personnel Blockchain Poc Demo </h1>

This is a PoC  code  to explain concepts of Blockchain  using Hyperledger Fabric to some potential clients.
The Client provides transportation services for workers at industrial Parks (ID). It host several routes to take people on and off factories and offices at from ID to City.
Several problems addressed:

  * Letting know to foremen, RRHH personal, etc if  key employees haven't got up the bus and a replacement has to be found immediately, so production won't get delayed.
    
  * Monitoring service quality, are the buses on time? 

  * Sort out disputes in case employees complain the bus was not on time / it passed earlier.

This can be solved through a centralized system, but disputes can arise anyway as source of truth is unique.
By means of implementing a distributed Ledger (descentralized system of record), all participants have same informaation so now is possible:

  * Automatically monitor quality of service
  * Programm penalties and discounts based on faults to contract terms
  * Implement a transportation service market where companies on the Industrial Park can select best-record transporters

Potential participants to the blockchain are not only client companies,Industrial Parks (offering this services as an incentive) and transport companies providing the services but also Union Trades that look after workers.

This demo code is implemented through Hyperledger Fabric, Angular framework and HLF Composer tool.
An HLF BNA chain code was created using HLF Composer and its code (query and model) files are on root folder. Dist folder was left as bundled BNA is available there.

Folder asiste1 contains Angular code.

The interface to Hyperledger Fabric chaincode from Angular code is through an automatic-generated  Restful API  Server (https://developer.ibm.com/recipes/tutorials/interacting-with-hyperledger-composer-through-restful-api/) and the app itself was initially scaffolded with Yeoman tool

asiste1 implements functions that in a production environment would be at different devices/platforms but it was helpful to show ideas.
The whole system was build on a Ubuntu Virtual Machine and docker containers.

A spanish spoken video running the demo is on: https://www.youtube.com/watch?v=nUqNg7Wqifo

