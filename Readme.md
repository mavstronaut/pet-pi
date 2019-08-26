# Pet-Pi
Pet monitoring and automated training system.

## Overview
While most pet monitoring products offer a camera and treat dispenser, the efficacy requires the owner to be watching behaviour, to use a microphone to encourage the pet to stop and by the force of a miracle reward the dog for its attention.

The problem is that not all pets are treat-motivated. Further, the efficacy requires a person to interact and catch the unwanted behaviours. 

Pet-pi is a raspberry pi automated system designed to catch the bad behaviour in the act every time. Further, the response is slightly randomized to ensure the pet won't see diminishing returns and ignore the response before learning the desired behaviours.

## How it works
Pet-pi connects a MERN application which authenticates google credentials to login to your machine at home. Once logged in and connected, the pet-pi system is ready for you to test the client-side custom noises set to: disrupt, distract and finally reward the good behaviour.

This response can be automated by integrating motion sensors, spacial detectors with the remotely connected speakers at various locations of no-go zones in your home. With our pup, he often browses the desks, tables and such areas while we're away. Place a sensor and speaker on your desk, then wait for the bad behaviour to happen. The disrupt noise fires at the desk until the dog moves away. A moment later, the distract noise happens in the other room. Once our dog reports to investigate and inevitably lies down to settle in his bed, the relaxing noise of chirping birds is released alongside a treat from our custom 3d-printed dispenser.

## Technology Used
Hardware
* Raspberry Pi 3b+
* Sound cards (1 for each speaker)
* Wifi speakers (1 for each card)
* USB hub and power (to connect sound cards)
* spatial sensor kit (lazers, light and camera have been used depending on the area)
* GPIO breadboard

Software
* Python (sensor code)
* Mongo 
* Express
* React
* Node.js
* Socket.io
* Firebase Auth

## Demo
Under construction. Coming soon.