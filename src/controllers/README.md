## Controllers Folder

This folder contains all the controllers of the application. The controllers are responsible for handling the requests and responses of the application.

Each controller is a folder with the following structure:

```

📁 controllers
├── 📁 ControllerOneName
│   ├── 📄 ControllerOneName.ts
│   ├── 📄 ControllerOneName.definitions.ts
│   └── 📁__tests__
│       └─── ControllerOneName.test.ts
└── 📁 ControllerTwoName
    ├── 📄 ControllerTwoName.ts
    ├── 📄 ControllerTwoName.definitions.ts
    └── 📁__tests__
        └─── ControllerTwoName.test.ts
```

## Important Files

###### ControllerName.ts

This file contains the controller itself. It is a typescript file that exports the controller. This includes the interface for the props and other types that are used in the controller.

###### ControllerName.definitions.ts

This file contains the typescript definitions for the controller. It is a typescript file that exports the types for the controller. This includes the interface for the props and other types that are used in the controller.

###### ControllerName.test.ts

This file contains the jest tests for the controller. It is a jest test file that tests the controller.


## Important Notes

- What is a controller?
  - A controller is a class that handles the requests and responses of the application. It is responsible for handling the logic of the application.
