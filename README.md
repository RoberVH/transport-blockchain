CREATED ON AUGUST/SEPTEMBER  2018

This is some PoC  code  to explain concepts of Blockchain  using Hyperledger Fabric to some potential clients.
The Client provides transportation services for workers at industrail Parks. It host several routes to take people on and off factories and offices at from ID to City.
Several problems addressed:

    1 Letting know to foremen, RRHH personal, etc if  key employees hasn't got up the bus so a replacement has to be found immediately, so production won't get delayed
    
    2 Monitoring service quality, are the buses on time? 

    3 Sort out disputes in case employees complains the bus was not on time / it passed earlier

This can be solved through a centrilized system, but disputes can arise anyway as source of truth is unique
By means of implementing a distributed Ledger (descentrilized system of record), all participants have same informaation so nos is possible:

    1 Automatically monitor quality of service
    2 Programmed penalties and discounts based on faults to contract terms
    3 Implement a transportation service market where companies on the Industrial Park can select best-record transporters

Potential participants to the blockchain are not only client companies, Industrial Parks (offering this services as an incentive) and transport companies providing the services but also Union Trades that look after workers

This demo code is implemented through Hyperledger Fabric, Angular framework and Composer tool
A HLF BNA chain code was created using HLF Composer and its code (query and model) files are on root folder. Dist folder was left as bundled BNA is available

Folder asiste1 contains Angular code.

The interface to Angular code is through an automatic-generated  Restful API  Server (https://developer.ibm.com/recipes/tutorials/interacting-with-hyperledger-composer-through-restful-api/) and the app itself was scaffold with Yeoman tool

Asiste1 implements functions that in a production environment be in different devices but it was helpful to show ideas.

A spanish spoken video running the demo is on: https://www.youtube.com/watch?v=nUqNg7Wqifo

