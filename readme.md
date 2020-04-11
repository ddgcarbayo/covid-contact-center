# Covid19 Contact Center

Contact center para la evaluación del covid-19 desarrollado sobre AWS Connect


# Archivos

**flow.json** con todo el flujo de la llamada de AWS connect, importable desde la consola. Requiere modificar el texto ID_FN_LAMBDA por el ARN de nuestra función (arn:aws:lambda:{{region}}:{{account}}:function:{{fn_name}})

**covid.js** con la función lambda que ejecuta la lógica de la aplicación y donde se pueden modificar los pesos de los síntomas, los textos y los umbrales que desencadenan los distintos diagnósticos

**doc.ppt** con la formación de la charla Ninja que impartiremos de forma virtual para BBVA Next Technologies y BBVA

**videos/*** con todos los pasos para la creación del contact center
