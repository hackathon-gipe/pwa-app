<p align="center">
  <img width="400px" src="https://ubervo.es/static/media/brand.f7c49b8b.svg" />
</p>

¿Qué es Urbevo? Urbevo es un ecosistema de herramientas y aplicaciones para extraer y analizar las necesidades de indraestructura de una comunidad.
Urbevo extrae, procesa y muestra necesidades de varias fuentes y ligadas directamente a lo que las personas necesitan. Por otro lado, ofrece un aplicación para empresas para mostrar, analizar y seleccionar las actuaciones más relevantes para una comunidad.

Con Ubervo, empresas de infraestructura y organismos públicos pueden saber con certeza qué necesitan de ellos los ciudadanos.

## ¿Cómo funciona Urbevo?
Urbevo es un sistema modular y extensible y, por tanto, su funcionamiento abarca diferentes partes. Esta imagen plasma un resumen de su funcionamiento:

![Urbevo](https://github.com/hackathon-gipe/pwa-app/assets/9042789/df048513-47d2-46a0-80cd-4606093a437f)

Aunque muy a vista de pájaro, esta imagen da una idea bastante clara de lo que hace Urbevo. Se recogen datos de diversas fuentes como puede ser Twitter, la propia aplicación de Urbevo para Android e iOS, Google reseñas, prensa... Se procesan con lo que hemos llamado el _Needs Engine_ (el motor de necesidades), el cual produce unos datos estandarizados y homogéneos que son los que se muestran en el Backoffice, listos para consultar.

## De dónde obtiene datos actualmente Urbevo
En este momento, como prueba de concepto, tenemos dos _fetchers_. El primero es la aplicación web y el segundo es de Twitter. Vamos a detallarlos.

### Aplicación web
Esta aplicación es la manera más directa que tienen los ciudadanos de impulsar el cambio en su comunidad. Desde esta aplicación se pueden reportar necesidades que se tengan o sumarte a necesidades de otras personas.

<p>
  <img width=200px src="https://github.com/hackathon-gipe/pwa-app/assets/9042789/3c21e5f9-1ff9-4381-b066-8fc664c2e1b5" />
  <img width=200px src="https://github.com/hackathon-gipe/pwa-app/assets/9042789/9dc40a23-fc52-4791-8a32-a8af45b7194a" />
  <img width=200px src="https://github.com/hackathon-gipe/pwa-app/assets/9042789/af940dbc-5eaa-4537-9c6c-6a452d489cfb" />
</p>

El primer paso es marcar en el mapa dónde está el problema a dónde hace referencia la necesidad que se está reporando. Luego se detalla un poco más la necesidad dando un nombre y una descripción, además de alguna información extra del sitio, si fuese necesaria.

Con esta información ya tenemos lo que necesitamos y el usuario ha terminado su contribución, la información está lista para ser enviada al motor mediante la [api pública](https://github.com/hackathon-gipe/urbevo-needs-core).

### Twitter
Por otra parte, tenemos el _fetcher_ de Twitter, disponible [aquí](https://github.com/hackathon-gipe/urbevo-twitter-fetcher). Esta pieza a lo que se dedica es a escanear tweets de una búsqueda concreta. Esa búsqueda hace referencia a las zonas geográficas en las que nos vamos a centrar.

Una vez se obtiene el tweet, se extrae su información, se le genera un ID y se envía a un bus de necesidades que se encargará de hacerlas llegar al motor.

### Motor de necesidades
Aquí es donde sucede la magia, está disponible [aquí](https://github.com/hackathon-gipe/urbevo-needs-engine). Las necesidades, o bien llegan limpias desde la aplicación al motor listas para ser almacenadas, o bien llegan desde diferentes fuentes desde el bus de necesidades. Este segundo caso es el interesante, pues hay que hacer algún procesamiento extra. La idea es que el motor tome diferentes decisiones en base a la fuente de la información, pero eso será en en un futuro.

En este momento, el motor recibe la infromación, por ejemplo, de Twitter y la manda a la API de ChatGPT con unas instrucciones pre-definidas para que extraiga la información que necesitamos.

Una vez que tiene dicha información, la almacenamos en la base de datos de necesidades.

### Backoffice para empresas
Esta es otra de las piezas cruciales. Es el punto de acceso de las empresas para conocer y explorar las necesidades de las personas.
![BackOffice](https://github.com/hackathon-gipe/pwa-app/assets/9042789/fea9af9d-3ecb-4def-bd63-05b079eb1dc6)

En esta aplicación es donde las empresas pueden explorar e, idealmente, decidir sobre qué necesidades van a actuar.

Cada necesidad tiene un índice de relevancia que calculamos, dependiendo de cada fuente, en base a diferentes parámetros. Usando este índice y otros datos como la localización, etc. las empresas deberían tener suficiente información como para saber qué necesidades pueden cubrir en alguna obra civil que vayan a ejecutar o, por qué no, incluso planificar para cubrir una de estas necesidades.

## ¿Cómo está construída Urbevo?
Como ya hemos visto, uno de los atractivos de Urbevo es su modularidad. Es por ello que lo hemos construído sobre AWS usando todas las piezas que nos proporciona. Su arquitectura básica se muestra en la siguiente imagen.

![Architecture](https://github.com/hackathon-gipe/pwa-app/assets/9042789/4dd96633-cb64-4ba0-99b6-b2a44d73a7ef)

Procedemos a detallarla a continuación.

### Fechers
Los _fetchers_ se ejecutan como Lambdas separadas. Una lambda por cada _fetcher_. Para desencadenar su ejecución de manera periódica vamos a usar Eventbridge.

Esta elección de tecnología nos permitiría escalar de una manera muy considerable la aplicación. Si, por ejemplo, el _fetcher_ de Twitter empieza a consumir mucha memoria o tiempo de ejecución porque tiene muchas búsquedas, se puede replicar la misma lambda N veces disminuyendo el número de búsquedas de cada una hasta el punto de llegar, incluso, a tener 1 lambda por búsqueda.

Además, incluír un nuevo fetcher es tan sencillo como crear una nueva lambda que haga la búsqueda y escriba el resultado en el bus de necesidades.

### Bus de necesidades
Este componente es justo lo que indica, un bus de mensajes. El objetivo de este bus es que sea capaz de manejar cantidades **enormes** de mensajes en poco tiempo. Aunque los _fetchers_ se invoquen de manera escalonada, cuando un grupo de ellos comience a trabajar, el bus de mensaje experimentará un pico en la ingesta que debe ser capaz de manejar.

Como, además, algunos de los _fetchers_ pueden ser de Twitter, lo cual implica grandes cantidades de información, hemos decidido usar Kinesis a este respecto.

Kinesis nos proporciona la estabilidad y escalabilidad que vayamos a necesitar en el futuro.

### Motor de necesidades
Esta pieza se compone de varios componentes a su vez. Por un lado se encuentra el procesador de necesidades. Esto es una (o varias) lambda que actuan como consumidoras de Kinesis. Estas lambdas procesarán los mensajes de Kinesis, extraerán la información usando la API de ChatGPT y almacenarán el resultado en la base de datos. Al igual que antes, en caso de necesitar más capacidad de procesamiento, AWS Lambda se encarga de esto aprovisionando más funciones en paralelo, permitiéndonos escalabilidad.

Por otro lado se encuentra la API pública. Esta está desplegada usando máquinas de EC2 y un Balanceador de carga de aplicaciones. Las peticiones que lleguen para almacenar necesidades desde la aplicación así como las peticiones que lleguen del Backoffice, atacarán a esta pieza. El balanceador de carga de aplicaciones nos permite escalar de manera horizontal llegado el caso. Por otro lado, EC2 también nos permite escalar en vertical usando tipos de instancias más potentes.

Por último se encuentra la base de datos, en este caso DynamoDB. DynamoDB nos da la flexibilidad de serverless, siendo trivial que las lambdas que procesan las necesidades escriban ahí pero también nos da la potencia y rapidez que necesita el backoffice. De nuevo, gracias al aprovisionamiento de unidades de lectura/escritura o incluso de las unidades bajo demanda, DyanmoDB es una opción perfecta de cara una necesidad de escalado en el futuro.

## Trabajo futuro
Esto es una prueba de concepto construída para la [Hackathon for Good: La Región de AWS en España al servicio de la sociedad](https://www.hackathoniberia.com/) organizada por AWS. Por tanto, el trabajo que hay aquí es un trabajo mínimo sobre todo lo que se podría ahondar en la solución.

El primer paso sería, por supuesto, que el _fetcher_ de Twitter tome datos reales. Ahora mismo son Tweets fijos debido al reciente cambio por parte de la empresa de cobrar el acceso a la API.

El siguiente paso sería añadir más _fetchers_ al ecosistema, permitiendo así obtener información de muchas más fuentes. Algunos de estos _fetchers_ podrían ser:
- Prensa
- Grupos de Facebook
- Change.org
- Datos públicos ofrecidos por los ayuntamientos
- Datos de encuestas realizadas por organismos públicos

Otro paso importante sería sustituir el servicio de ChatGPT de OpenAI por [Amazon Bedrock](https://aws.amazon.com/bedrock/). No lo hemos podido usar en este proyecto ya que aún no estaba disponible al público.

Otro paso importante sería la incorporación del concepto de "usuarios" al ecosistema. Tanto en el lado de la APP para poder registrar qué persona ha reportado cada necesidad como para que esa persona pueda llevar un seguimiento de las necesidades y mejoras de su comunidad. Por el lado del backoffice, crear cuentas de empresa para saber qué iniciativas han sido llevadas a cabo por qué empresa y, de la misma manera, poder llevar un seguimiento y obtener métricas.

## Autores

<a href="https://github.com/alesanmed
https://github.com/Alma-Co
https://github.com/feliperamis"><img src="https://github.com/hackathon-gipe/pwa-app/assets/9042789/0aa68b9a-636b-4784-87ca-c898543e9aa1" width="200px" stye="border-radius: 50%"/></a>
<a href="https://github.com/alesanmed
https://github.com/Alma-Co
https://github.com/feliperamis"><img src="https://github.com/hackathon-gipe/pwa-app/assets/9042789/16f217a8-3730-4c75-871c-073aadb7070f" width="200px" stye="border-radius: 50%"/></a>
<a href="https://github.com/alesanmed
https://github.com/Alma-Co
https://github.com/feliperamis"><img src="https://github.com/hackathon-gipe/pwa-app/assets/9042789/ba590d89-799f-45cc-9cfc-52ec10c9ca0c" width="200px" stye="border-radius: 50%"/></a>
