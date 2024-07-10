const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const flowPotenciadores = addKeyword(['Rígida no permanente', 'Ligeramente Rígida', 'Erecto ocasionalmente', 'No erecto', '1', '2', '3', '4'])
    .addAnswer('Para potenciar el rendimiento sexual, destaca nuestro producto Megax Premium. Potenciador con efecto prolongado de hasta 72 horas de forma segura y sin efectos secundarios. Sus componentes potencian la circulación sanguínea en el área genital, contribuyendo al incremento de la potencia y el tamaño de tu miembro. Además, el potenciador sexual Megax Premium, a diferencia de otros potenciadores, es apto para personas hipertensas y diabéticas, brindando una solución segura y efectiva para todos.')
    .addAnswer('Puedes solicitar el Megax Premium con pago contraentrega desde nuestra web y adquirirlo en descuento, con envío gratis y pago contraentrega. https://clinicasvitalys.co/producto/megax-premium/?ref=93')
    .addAnswer('También puedes visitar nuestra página web https://clinicasvitalys.co/?ref=93');

const flowDisfuncion = addKeyword(['Disfunción Eréctil', 'disfuncion', 'disfunción', '1', 'Disfunción Erectil'])
    .addAnswer('En Clínicas Vitalys ofrecemos soluciones personalizadas para abordar la disfunción eréctil. Para esto, me gustaría saber tu nivel de disfunción eréctil. Por favor, selecciona la opción que más se adapte a tu caso.')
    .addAnswer('Consideras la calidad de tu erección así:\nEnvia 1 para : Rígida no permanente\nEnvia 2 para : Ligeramente Rígida\nEnvia 3 para : Erecto ocasionalmente\nEnvia 4 para : No erecto', null, null, [flowPotenciadores]);

const flowRetardantes = addKeyword(['Menos de 30 minutos', 'Menos de 20 Minutos', 'Menos de 10 Minutos', 'Menos de 5 minutos', '1', '2', '3', '4'])
    .addAnswer('En Clínicas Vitalys, tenemos varias opciones que podrían ayudarte a lograr tus objetivos. Uno de nuestros productos más populares es Tardomax, que ayuda a controlar la eyaculación precoz y a prolongar el placer.')
    .addAnswer('Obtén más información sobre el TardoMax o solicítalo con pago a contra entrega haciendo clic aquí: https://clinicasvitalys.co/producto/tardo-max-spray/?ref=93')
    .addAnswer('También puedes visitar nuestra página web https://clinicasvitalys.co/?ref=93');

const flowEyaculacion = addKeyword(['Eyaculación Precoz', 'eyaculacion', '2', 'dos'])
    .addAnswer('En Clínicas Vitalys ofrecemos soluciones personalizadas para abordar el control eyaculatorio. Me gustaría saber tu situación actual, por favor selecciona la opción que más se adapte a tu caso.')
    .addAnswer('Eyaculas después de la penetración en:\nEnvia 1 para : Menos de 30 minutos\nEnvia 2 para : Menos de 20 Minutos\nEnvia 3 para : Menos de 10 Minutos\nEnvia 4 para : Menos de 5 minutos', null, null, [flowRetardantes]);

const flowAumento = addKeyword(['Miembro Pequeño', '3'])
    .addAnswer('Para aumentar el tamaño, las bombas de vacío son una opción eficaz y popular. Estas bombas trabajan creando una presión alrededor del pene, lo que ayuda a incrementar el flujo sanguíneo y, con el tiempo, puede contribuir a aumentar el tamaño y mejorar la función eréctil.')
    .addAnswer('Nuestra bomba más eficiente es la Bomba HidroMax X30. Obtén más información o solicítala a contra entrega en https://clinicasvitalys.co/producto/bomba-hidro-max/?ref=93');

const flowTodo = addKeyword(['Todas las anteriores', '4', 'todo', 'todas'])
    .addAnswer('Nuestro programa más completo para mejorar la salud sexual es el programa Elonguer. Este programa ofrece múltiples beneficios, entre ellos: Aumento del tamaño: El programa está diseñado para incrementar tanto el grosor como la longitud del pene. Mejora de la función eréctil: Al seguir este programa, es posible experimentar erecciones más fuertes y duraderas. Mayor control: El programa también ayuda a mejorar el control sobre la eyaculación, lo que puede contribuir a prolongar el placer. Puedes solicitarlo con pago contraentrega desde nuestra web y adquirirlo en descuento, con envío gratis y pago contraentrega. https://clinicasvitalys.co/producto/programa-elonguer/?ref=93')
    .addAnswer('También puedes visitar nuestra página web https://clinicasvitalys.co/?ref=93');

const flowPrincipal = addKeyword(['hola', '0', 'o', 'buenas', 'buenas tardes', 'buena tarde', 'buen dia', 'buenos dias', 'buena noche', 'buenas noches'])
    .addAnswer('🙌 Hola...! Soy la Dra. Daniela Camargo, especialista de Clínicas Vitalys.')
    .addAnswer('Por favor indícame en qué aspecto deseas mejorar, enviando:\nEnvia 1 para: Disfunción Eréctil\nEnvia 2 para: Eyaculación Precoz\nEnvia 3 para: Miembro Pequeño\nEnvia 4 para: Todas las anteriores', null, null, [flowDisfuncion, flowEyaculacion, flowAumento, flowTodo]);

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();
