const express = require('express');
const router = express.Router();
const execute = require('./connection');


router.post("/ordenes_lotes", async(req,res)=>{

	const {empnit} = req.body;

	let qry = `
		SELECT NOLOTE, DESNOLOTE AS DESCRIPCION,
          FECHANOLOTE AS FECHA 
			FROM NLOTES 
			WHERE EMP_NIT = '${empnit}' AND NOACTIVO=0
	  `

	execute.Query(res,qry);

});

router.post("/config", async(req,res)=>{

	const {empnit} = req.body;

	let qry = `
		SELECT VER_LOTES,VER_CATEGORIAS,TABLA_CATEGORIAS,COD_CATEGORIA
      FROM TEMP_CONFIG_PRODUCCION
			WHERE EMP_NIT = '${empnit}'
	  `

	execute.Query(res,qry);

});


router.post("/config_update", async(req,res)=>{

	const {empnit,opcion,valor} = req.body;

  let qry = '';

  switch (opcion) {
    case 'LOTES':
      qry = `UPDATE TEMP_CONFIG_PRODUCCION SET VER_LOTES = '${valor}' WHERE EMP_NIT='${empnit}' `;
      break;
    case 'CATEGORIAS':
      qry = `UPDATE TEMP_CONFIG_PRODUCCION SET VER_CATEGORIAS = '${valor}' WHERE EMP_NIT='${empnit}' `;
      break;
    case 'TABLA':
      qry = `UPDATE TEMP_CONFIG_PRODUCCION SET TABLA_CATEGORIAS = '${valor}' WHERE EMP_NIT='${empnit}' `;
      break;
    case 'VALOR':
      qry = `UPDATE TEMP_CONFIG_PRODUCCION SET COD_CATEGORIA = '${valor}' WHERE EMP_NIT='${empnit}' `;
      break;
  };


	execute.Query(res,qry);

});




router.post("/ordenes_pendientes", async(req,res)=>{

	const {empnit} = req.body;

	let qryx = `
		SELECT Documentos.EMP_NIT, 
		Documentos.CODDOC, 
		Documentos.DOC_NUMERO, 
		Documentos.DOC_FECHA AS FECHA,
		Documentos.DOC_OBS AS OBS,
    Documentos.DOC_NUMREF AS CODDOCSAL,
    Documentos.DOC_NOMREF AS DOC_NUMEROSAL,
    Documentos.DOC_MATSOLI AS FABRICADO
		FROM Documentos LEFT OUTER JOIN Tipodocumentos ON Documentos.CODDOC = Tipodocumentos.CODDOC AND Documentos.EMP_NIT = Tipodocumentos.EMP_NIT
		WHERE (Tipodocumentos.TIPODOC = 'PRO') 
		AND (Documentos.EMP_NIT = '${empnit}') 
		AND (Documentos.DOC_ESTATUS IN('O','I')) 
    ORDER BY Documentos.CODDOC, Documentos.DOC_NUMERO
	`

  let qryy = `
  SELECT Documentos.EMP_NIT, Documentos.CODDOC, Documentos.DOC_NUMERO, Documentos.DOC_FECHA AS FECHA, Documentos.DOC_OBS AS OBS, Documentos.DOC_NUMREF AS CODDOCSAL, 
                        Documentos.DOC_NOMREF AS DOC_NUMEROSAL, Documentos.DOC_MATSOLI AS FABRICADO, 
                        Web_Fin_Prod.MICROSQTY AS MICROS_ESPERADO, 
                        Web_Fin_Prod.MICROS AS MICROS_PESADO, 
                        Web_Fin_Prod.MACROSSQTY AS MACROS_ESPERADO, 
                        Web_Fin_Prod.MACROS AS MACROS_PESADO, 
                        Web_Fin_Prod.OTROS, 
                        Web_Fin_Prod.FINALIZADO
FROM Documentos LEFT OUTER JOIN
                        Web_Fin_Prod ON Documentos.DOC_NUMERO = Web_Fin_Prod.DOC_NUMERO AND Documentos.CODDOC = Web_Fin_Prod.CODDOC AND Documentos.EMP_NIT = Web_Fin_Prod.EMP_NIT LEFT OUTER JOIN
                        Tipodocumentos ON Documentos.CODDOC = Tipodocumentos.CODDOC AND Documentos.EMP_NIT = Tipodocumentos.EMP_NIT
WHERE  (Tipodocumentos.TIPODOC = 'PRO') AND (Documentos.EMP_NIT = '${empnit}') AND (Documentos.DOC_ESTATUS IN ('O', 'I'))
ORDER BY Documentos.CODDOC, Documentos.DOC_NUMERO
`;

let qry = `
SELECT        Documentos.EMP_NIT, Documentos.CODDOC, Documentos.DOC_NUMERO, Documentos.DOC_FECHA AS FECHA, Documentos.DOC_OBS AS OBS, Documentos.DOC_NUMREF AS CODDOCSAL, 
                         Documentos.DOC_NOMREF AS DOC_NUMEROSAL, Documentos.DOC_MATSOLI AS FABRICADO, 
                         Web_Fin_Prod.MICROSQTY AS MICROS_ESPERADO, 
                         Web_Fin_Prod.MICROS AS MICROS_PESADO, 
                         Web_Fin_Prod.MACROSSQTY AS MACROS_ESPERADO, 
                         Web_Fin_Prod.MACROS AS MACROS_PESADO, 
                         Web_Fin_Prod.OTROS, 
                         Web_Fin_Prod.FINALIZADO
FROM            Documentos LEFT OUTER JOIN
                         Web_Fin_Prod ON Documentos.DOC_NUMERO = Web_Fin_Prod.NUMFAC AND Documentos.CODDOC = Web_Fin_Prod.CODFAC AND Documentos.EMP_NIT = Web_Fin_Prod.EMP_NIT LEFT OUTER JOIN
                         Tipodocumentos ON Documentos.CODDOC = Tipodocumentos.CODDOC AND Documentos.EMP_NIT = Tipodocumentos.EMP_NIT
WHERE        (Tipodocumentos.TIPODOC = 'PRO') AND (Documentos.EMP_NIT = '${empnit}') AND (Documentos.DOC_ESTATUS IN ('O', 'I'))
ORDER BY Documentos.CODDOC, Documentos.DOC_NUMERO
`;
	execute.Query(res,qry);

});


router.post("/ordenes_nueva", async(req,res)=>{

	const {empnit,coddocent,correlativoent, coddocsal, correlativosal,fecha,obs,codprod, desprod, cantidad, codmedida,equivale} = req.body;


	let correlativoentada = getCorrelativo_isc(correlativoent);
	let nuevocorrelativoEntrada = getCorrelativo_isc((Number(correlativoent)+1));

	let correlativosalida = getCorrelativo_isc(correlativosal);
	let nuevocorrelativoSalida = getCorrelativo_isc((Number(correlativosal)+1));



	let qryDocEntrada = `
	INSERT INTO [dbo].[Documentos]
           ([EMP_NIT]
           ,[DOC_ANO]
           ,[DOC_MES]
           ,[CODDOC]
           ,[DOC_NUMERO]
           ,[CODCAJA]
           ,[DOC_FECHA]
           ,[DOC_NUMREF]
           ,[DOC_NOMREF]
           ,[BODEGAENTRADA]
           ,[BODEGASALIDA]
           ,[USUARIO]
           ,[DOC_ESTATUS]
           ,[DOC_TOTALCOSTO]
           ,[DOC_TOTALVENTA]
           ,[DOC_HORA]
           ,[DOC_FVENCE]
           ,[DOC_DIASCREDITO]
           ,[DOC_CONTADOCREDITO]
           ,[DOC_DESCUENTOTOTAL]
           ,[DOC_DESCUENTOPROD]
           ,[DOC_PORDESCUTOTAL]
           ,[DOC_IVA]
           ,[DOC_SUBTOTALIVA]
           ,[DOC_SUBTOTAL]
           ,[NITCLIE]
           ,[DOC_PORDESCUFAC]
           ,[CODVEN]
           ,[DOC_ABONOS]
           ,[DOC_SALDO]
           ,[DOC_VUELTO]
           ,[DOC_NIT]
           ,[DOC_PAGO]
           ,[DOC_CODREF]
           ,[DOC_TIPOCAMBIO]
           ,[DOC_PARCIAL]
           ,[DOC_ANTICIPO]
           ,[ANT_CODDOC]
           ,[ANT_DOCNUMERO]
           ,[DOC_OBS]
           ,[DOC_PORCENTAJEIVA]
           ,[DOC_ENVIO]
           ,[DOC_CUOTAS]
           ,[DOC_TIPOCUOTA]
           ,[DOC_FMODIFICA]
           ,[DIVA_NUMINT]
           ,[FRT_CODIGO]
           ,[TRANSPORTE]
           ,[DOC_REFPEDIDO]
           ,[DOC_REFFACTURA]
           ,[CODPROV]
           ,[DOC_TOTALOTROS]
           ,[DOC_RECIBO]
           ,[DOC_MATSOLI]
           ,[DOC_REFERENCIA]
           ,[DOC_LUGAR]
           ,[DOC_ANOMBREDE]
           ,[DOC_IVAEXO]
           ,[DOC_VALOREXO]
           ,[DOC_SECTOR]
           ,[DOC_DIRENTREGA]
           ,[DOC_CANTENV]
           ,[DOC_EXP]
           ,[DOC_FECHAENT]
           ,[TIPOPRODUCCION]
           ,[DOC_TOTCOSINV]
           ,[DOC_TOTALFIN]
           ,[USUARIOENUSO]
           ,[DOC_IMPUESTO1]
           ,[DOC_TOTALIMPU1]
           ,[DOC_PORCOMI]
           ,[DOC_DOLARES]
           ,[CODMESA]
           ,[DOC_TIPOOPE]
           ,[USUARIOAUTORIZA]
           ,[NUMAUTORIZA]
           ,[FECHAAUTORIZA]
           ,[HORAAUTORIZA]
           ,[DOC_TEMPORADA]
           ,[DOC_INGUAT]
           ,[FECHAINGBOD]
           ,[HORAINGBOD]
           ,[FECHASALBOD]
           ,[HORASALBOD]
           ,[CODVENBOD]
           ,[CODHABI]
           ,[DOC_SERIE]
           ,[DOC_FECHAFAC]
           ,[DOC_IVARETENIDO]
           ,[FECHARECBOD]
           ,[HORARECBOD]
           ,[CTABAN]
           ,[NUMINTBAN]
           ,[FECHARECEMP]
           ,[HORARECEMP]
           ,[FECHAINGEMP]
           ,[HORAINGEMP]
           ,[FECHASALEMP]
           ,[HORASALEMP]
           ,[CODVENEMP]
           ,[FECHARECFAC]
           ,[HORARECFAC]
           ,[FECHAINGFAC]
           ,[HORAINGFAC]
           ,[FECHASALFAC]
           ,[HORASALFAC]
           ,[FECHARECENT]
           ,[HORARECENT]
           ,[FECHAINGENT]
           ,[HORAINGENT]
           ,[FECHASALENT]
           ,[HORASALENT]
           ,[DOC_TOTCOSDOL]
           ,[DOC_TOTCOSINVDOL]
           ,[CODUNIDAD]
           ,[TOTCOMBUSTIBLE]
           ,[DOC_CODCONTRA]
           ,[DOC_NUMCONTRA]
           ,[INTERES]
           ,[ABONOINTERES]
           ,[SALDOINTERES]
           ,[NUMEROCORTE]
           ,[DOC_PORLOCAL]
           ,[DOC_NUMORDEN]
           ,[DOC_FENTREGA]
           ,[DOC_INTERESADO]
           ,[DOC_RECIBE]
           ,[NUMEROROLLO]
           ,[COD_CENTRO]
           ,[GENCUOTA]
           ,[DOC_PORINGUAT]
           ,[DOC_INGUATEXENTO]
           ,[DOC_TIPOTRANIVA]
           ,[DOC_PORTIMBREPRE]
           ,[DOC_TIMBREPRENSA]
           ,[ABONOSANTICIPO]
           ,[SALDOANTICIPO]
           ,[DOC_PRODEXENTO]
           ,[PUNTOSGANADOS]
           ,[PUNTOSUSADOS]
           ,[APL_ANTICIPO]
           ,[COD_DEPARTA]
           ,[FIRMAELECTRONICA]
           ,[DOC_CODDOCRETENCION]
           ,[DOC_SERIERETENCION]
           ,[DOC_NUMRETENCION]
           ,[FIRMAISC]
           ,[ISCENVIADO]
           ,[IDELECTRONICA]
           ,[INTERESFAC]
           ,[TOTAL_IDB]
           ,[TIPO_CONSTANCIA]
           ,[NUM_CONSTANCIA]
           ,[VALOR_CONSTANCIA]
           ,[CODDOCLIQ]
           ,[NUMDOCLIQ]
           ,[CODACTI]
           ,[GASTOLIQ]
           ,[DOC_TOTCOSINVBOD]
           ,[ITEM_EVENTOLIQ]
           ,[DOC_LATITUD]
           ,[DOC_LONGITUD]
           ,[DOC_NUMEROAPP]
           ,[DOC_SERIE_A]
           ,[DOC_REFFACTURA_A]
           ,[FIRMAELECTRONICA_A]
           ,[IDELECTRONICA_A])
  SELECT '${empnit}' AS EMP_NIT,	YEAR(GETDATE()) AS DOC_ANO,	MONTH(GETDATE()) AS DOC_ANO,	'${coddocent}' AS CODDOC,	'${correlativoentada}' AS DOC_NUMERO,	'' AS CODCAJA,	CONVERT(DATE,GETDATE(),102) AS DOC_FECHA,	'${coddocsal}' AS DOC_NUMREF,	'${correlativosalida}' AS DOC_NOMREF,	'1' AS BODEGAENTRADA,	'' AS BODEGASALIDA,	'GIO-PROD' AS USUARIO,	'O' AS DOC_ESTATUS,	'0' AS DOC_TOTALCOSTO,	'0' AS DOC_TOTALVENTA,	FORMAT (getdate(), 'hh:mm:ss') AS DOC_HORA,	'' AS DOC_FVENCE,	'0' AS DOC_DIASCREDITO,	'' AS DOC_CONTADOCREDITO,	'0' AS DOC_DESCUENTOTOTAL,	'0' AS DOC_DESCUENTOPROD,	'0' AS DOC_PORDESCUTOTAL,	'0' AS DOC_IVA,	'0' AS DOC_SUBTOTALIVA,	'0' AS DOC_SUBTOTAL,	'' AS NITCLIE,	'0' AS DOC_PORDESCUFAC,	'0' AS CODVEN,	'0' AS DOC_ABONOS,	'0' AS DOC_SALDO,	'0' AS DOC_VUELTO,	'' AS DOC_NIT,	'0' AS DOC_PAGO,	'' AS DOC_CODREF,	'0' AS DOC_TIPOCAMBIO,	'0' AS DOC_PARCIAL,	'0' AS DOC_ANTICIPO,	'' AS ANT_CODDOC,	'' AS ANT_DOCNUMERO,	'${obs}' AS DOC_OBS,	'0' AS DOC_PORCENTAJEIVA,	'0' AS DOC_ENVIO,	'0' AS DOC_CUOTAS,	'0' AS DOC_TIPOCUOTA,	'' AS DOC_FMODIFICA,	'0' AS DIVA_NUMINT,	'' AS FRT_CODIGO,	'' AS TRANSPORTE,	'' AS DOC_REFPEDIDO,	'' AS DOC_REFFACTURA,	'' AS CODPROV,	'0' AS DOC_TOTALOTROS,	'0' AS DOC_RECIBO,	'' AS DOC_MATSOLI,	'' AS DOC_REFERENCIA,	'' AS DOC_LUGAR,	'' AS DOC_ANOMBREDE,	' ' AS DOC_IVAEXO,	'0' AS DOC_VALOREXO,	'' AS DOC_SECTOR,	'' AS DOC_DIRENTREGA,	'' AS DOC_CANTENV,	'' AS DOC_EXP,	'' AS DOC_FECHAENT,	'' AS TIPOPRODUCCION,	'0' AS DOC_TOTCOSINV,	'0' AS DOC_TOTALFIN,	'' AS USUARIOENUSO,	'0' AS DOC_IMPUESTO1,	'0' AS DOC_TOTALIMPU1,	'0' AS DOC_PORCOMI,	'0' AS DOC_DOLARES,	'' AS CODMESA,	'0' AS DOC_TIPOOPE,	' ' AS USUARIOAUTORIZA,	'0' AS NUMAUTORIZA,	'' AS FECHAAUTORIZA,	'' AS HORAAUTORIZA,	'0' AS DOC_TEMPORADA,	'0' AS DOC_INGUAT,	CONVERT(DATE,GETDATE(),102) AS FECHAINGBOD,	FORMAT (getdate(), 'hh:mm:ss') AS HORAINGBOD,	CONVERT(DATE,GETDATE(),102) AS FECHASALBOD,	FORMAT (getdate(), 'hh:mm:ss') AS HORASALBOD,	'0' AS CODVENBOD,	'' AS CODHABI,	' ' AS DOC_SERIE,	'' AS DOC_FECHAFAC,	'0' AS DOC_IVARETENIDO,	'' AS FECHARECBOD,	'' AS HORARECBOD,	'0' AS CTABAN,	'0' AS NUMINTBAN,	'' AS FECHARECEMP,	'' AS HORARECEMP,	'' AS FECHAINGEMP,	'' AS HORAINGEMP,	'' AS FECHASALEMP,	'' AS HORASALEMP,	'0' AS CODVENEMP,	'' AS FECHARECFAC,	'' AS HORARECFAC,	'' AS FECHAINGFAC,	'' AS HORAINGFAC,	'' AS FECHASALFAC,	'' AS HORASALFAC,	'' AS FECHARECENT,	'' AS HORARECENT,	'' AS FECHAINGENT,	'' AS HORAINGENT,	'' AS FECHASALENT,	'' AS HORASALENT,	'0' AS DOC_TOTCOSDOL,	'0' AS DOC_TOTCOSINVDOL,	'' AS CODUNIDAD,	'0' AS TOTCOMBUSTIBLE,	'' AS DOC_CODCONTRA,	'' AS DOC_NUMCONTRA,	'0' AS INTERES,	'0' AS ABONOINTERES,	'0' AS SALDOINTERES,	'0' AS NUMEROCORTE,	'0' AS DOC_PORLOCAL,	'' AS DOC_NUMORDEN,	'' AS DOC_FENTREGA,	'' AS DOC_INTERESADO,	'' AS DOC_RECIBE,	'0' AS NUMEROROLLO,	'' AS COD_CENTRO,	'' AS GENCUOTA,	'0' AS DOC_PORINGUAT,	'N' AS DOC_INGUATEXENTO,	'C' AS DOC_TIPOTRANIVA,	'0' AS DOC_PORTIMBREPRE,	'0' AS DOC_TIMBREPRENSA,	'0' AS ABONOSANTICIPO,	'0' AS SALDOANTICIPO,	'0' AS DOC_PRODEXENTO,	'0' AS PUNTOSGANADOS,	'0' AS PUNTOSUSADOS,	'0' AS APL_ANTICIPO,	'' AS COD_DEPARTA,	'' AS FIRMAELECTRONICA,	'' AS DOC_CODDOCRETENCION,	'' AS DOC_SERIERETENCION,	'' AS DOC_NUMRETENCION,	'' AS FIRMAISC,	'0' AS ISCENVIADO,	'' AS IDELECTRONICA,	'0' AS INTERESFAC,	'0' AS TOTAL_IDB,	'N' AS TIPO_CONSTANCIA,	'' AS NUM_CONSTANCIA,	'0' AS VALOR_CONSTANCIA,	'' AS CODDOCLIQ,	'' AS NUMDOCLIQ,	'' AS CODACTI,	'' AS GASTOLIQ,	'0' AS DOC_TOTCOSINVBOD,	'0' AS ITEM_EVENTOLIQ,	'0' AS DOC_LATITUD,	'0' AS DOC_LONGITUD,	'' AS DOC_NUMEROAPP,	'NULL' AS DOC_SERIE_A,	'NULL' AS DOC_REFFACTURA_A,	'NULL' AS FIRMAELECTRONICA_A,	'NULL' AS IDELECTRONICA_A;
	`;

	let qryDocSalida = `
	INSERT INTO [dbo].[Documentos]
           ([EMP_NIT]
           ,[DOC_ANO]
           ,[DOC_MES]
           ,[CODDOC]
           ,[DOC_NUMERO]
           ,[CODCAJA]
           ,[DOC_FECHA]
           ,[DOC_NUMREF]
           ,[DOC_NOMREF]
           ,[BODEGAENTRADA]
           ,[BODEGASALIDA]
           ,[USUARIO]
           ,[DOC_ESTATUS]
           ,[DOC_TOTALCOSTO]
           ,[DOC_TOTALVENTA]
           ,[DOC_HORA]
           ,[DOC_FVENCE]
           ,[DOC_DIASCREDITO]
           ,[DOC_CONTADOCREDITO]
           ,[DOC_DESCUENTOTOTAL]
           ,[DOC_DESCUENTOPROD]
           ,[DOC_PORDESCUTOTAL]
           ,[DOC_IVA]
           ,[DOC_SUBTOTALIVA]
           ,[DOC_SUBTOTAL]
           ,[NITCLIE]
           ,[DOC_PORDESCUFAC]
           ,[CODVEN]
           ,[DOC_ABONOS]
           ,[DOC_SALDO]
           ,[DOC_VUELTO]
           ,[DOC_NIT]
           ,[DOC_PAGO]
           ,[DOC_CODREF]
           ,[DOC_TIPOCAMBIO]
           ,[DOC_PARCIAL]
           ,[DOC_ANTICIPO]
           ,[ANT_CODDOC]
           ,[ANT_DOCNUMERO]
           ,[DOC_OBS]
           ,[DOC_PORCENTAJEIVA]
           ,[DOC_ENVIO]
           ,[DOC_CUOTAS]
           ,[DOC_TIPOCUOTA]
           ,[DOC_FMODIFICA]
           ,[DIVA_NUMINT]
           ,[FRT_CODIGO]
           ,[TRANSPORTE]
           ,[DOC_REFPEDIDO]
           ,[DOC_REFFACTURA]
           ,[CODPROV]
           ,[DOC_TOTALOTROS]
           ,[DOC_RECIBO]
           ,[DOC_MATSOLI]
           ,[DOC_REFERENCIA]
           ,[DOC_LUGAR]
           ,[DOC_ANOMBREDE]
           ,[DOC_IVAEXO]
           ,[DOC_VALOREXO]
           ,[DOC_SECTOR]
           ,[DOC_DIRENTREGA]
           ,[DOC_CANTENV]
           ,[DOC_EXP]
           ,[DOC_FECHAENT]
           ,[TIPOPRODUCCION]
           ,[DOC_TOTCOSINV]
           ,[DOC_TOTALFIN]
           ,[USUARIOENUSO]
           ,[DOC_IMPUESTO1]
           ,[DOC_TOTALIMPU1]
           ,[DOC_PORCOMI]
           ,[DOC_DOLARES]
           ,[CODMESA]
           ,[DOC_TIPOOPE]
           ,[USUARIOAUTORIZA]
           ,[NUMAUTORIZA]
           ,[FECHAAUTORIZA]
           ,[HORAAUTORIZA]
           ,[DOC_TEMPORADA]
           ,[DOC_INGUAT]
           ,[FECHAINGBOD]
           ,[HORAINGBOD]
           ,[FECHASALBOD]
           ,[HORASALBOD]
           ,[CODVENBOD]
           ,[CODHABI]
           ,[DOC_SERIE]
           ,[DOC_FECHAFAC]
           ,[DOC_IVARETENIDO]
           ,[FECHARECBOD]
           ,[HORARECBOD]
           ,[CTABAN]
           ,[NUMINTBAN]
           ,[FECHARECEMP]
           ,[HORARECEMP]
           ,[FECHAINGEMP]
           ,[HORAINGEMP]
           ,[FECHASALEMP]
           ,[HORASALEMP]
           ,[CODVENEMP]
           ,[FECHARECFAC]
           ,[HORARECFAC]
           ,[FECHAINGFAC]
           ,[HORAINGFAC]
           ,[FECHASALFAC]
           ,[HORASALFAC]
           ,[FECHARECENT]
           ,[HORARECENT]
           ,[FECHAINGENT]
           ,[HORAINGENT]
           ,[FECHASALENT]
           ,[HORASALENT]
           ,[DOC_TOTCOSDOL]
           ,[DOC_TOTCOSINVDOL]
           ,[CODUNIDAD]
           ,[TOTCOMBUSTIBLE]
           ,[DOC_CODCONTRA]
           ,[DOC_NUMCONTRA]
           ,[INTERES]
           ,[ABONOINTERES]
           ,[SALDOINTERES]
           ,[NUMEROCORTE]
           ,[DOC_PORLOCAL]
           ,[DOC_NUMORDEN]
           ,[DOC_FENTREGA]
           ,[DOC_INTERESADO]
           ,[DOC_RECIBE]
           ,[NUMEROROLLO]
           ,[COD_CENTRO]
           ,[GENCUOTA]
           ,[DOC_PORINGUAT]
           ,[DOC_INGUATEXENTO]
           ,[DOC_TIPOTRANIVA]
           ,[DOC_PORTIMBREPRE]
           ,[DOC_TIMBREPRENSA]
           ,[ABONOSANTICIPO]
           ,[SALDOANTICIPO]
           ,[DOC_PRODEXENTO]
           ,[PUNTOSGANADOS]
           ,[PUNTOSUSADOS]
           ,[APL_ANTICIPO]
           ,[COD_DEPARTA]
           ,[FIRMAELECTRONICA]
           ,[DOC_CODDOCRETENCION]
           ,[DOC_SERIERETENCION]
           ,[DOC_NUMRETENCION]
           ,[FIRMAISC]
           ,[ISCENVIADO]
           ,[IDELECTRONICA]
           ,[INTERESFAC]
           ,[TOTAL_IDB]
           ,[TIPO_CONSTANCIA]
           ,[NUM_CONSTANCIA]
           ,[VALOR_CONSTANCIA]
           ,[CODDOCLIQ]
           ,[NUMDOCLIQ]
           ,[CODACTI]
           ,[GASTOLIQ]
           ,[DOC_TOTCOSINVBOD]
           ,[ITEM_EVENTOLIQ]
           ,[DOC_LATITUD]
           ,[DOC_LONGITUD]
           ,[DOC_NUMEROAPP]
           ,[DOC_SERIE_A]
           ,[DOC_REFFACTURA_A]
           ,[FIRMAELECTRONICA_A]
           ,[IDELECTRONICA_A])
     SELECT '${empnit}' AS EMP_NIT,	YEAR(GETDATE()) AS DOC_ANO,	MONTH(GETDATE()) AS DOC_ANO,'${coddocsal}' AS CODDOC
      ,'${correlativosalida}' AS [DOC_NUMERO]
,	'' AS CODCAJA,	CONVERT(DATE,GETDATE(),102) AS DOC_FECHA,	'${coddocsal}' AS DOC_NUMREF,	'${correlativosalida}' AS DOC_NOMREF,	'1' AS BODEGAENTRADA,	'' AS BODEGASALIDA,	'GIO-PROD' AS USUARIO,	'O' AS DOC_ESTATUS,	'0' AS DOC_TOTALCOSTO,	'0' AS DOC_TOTALVENTA,	FORMAT (getdate(), 'hh:mm:ss') AS DOC_HORA,	'' AS DOC_FVENCE,	'0' AS DOC_DIASCREDITO,	'' AS DOC_CONTADOCREDITO,	'0' AS DOC_DESCUENTOTOTAL,	'0' AS DOC_DESCUENTOPROD,	'0' AS DOC_PORDESCUTOTAL,	'0' AS DOC_IVA,	'0' AS DOC_SUBTOTALIVA,	'0' AS DOC_SUBTOTAL,	'' AS NITCLIE,	'0' AS DOC_PORDESCUFAC,	'0' AS CODVEN,	'0' AS DOC_ABONOS,	'0' AS DOC_SALDO,	'0' AS DOC_VUELTO,	'' AS DOC_NIT,	'0' AS DOC_PAGO,	'' AS DOC_CODREF,	'0' AS DOC_TIPOCAMBIO,	'0' AS DOC_PARCIAL,	'0' AS DOC_ANTICIPO,	'' AS ANT_CODDOC,	'' AS ANT_DOCNUMERO,	'${obs}' AS DOC_OBS,	'0' AS DOC_PORCENTAJEIVA,	'0' AS DOC_ENVIO,	'0' AS DOC_CUOTAS,	'0' AS DOC_TIPOCUOTA,	'' AS DOC_FMODIFICA,	'0' AS DIVA_NUMINT,	'' AS FRT_CODIGO,	'' AS TRANSPORTE,	'' AS DOC_REFPEDIDO,	'' AS DOC_REFFACTURA,	'' AS CODPROV,	'0' AS DOC_TOTALOTROS,	'0' AS DOC_RECIBO,	'' AS DOC_MATSOLI,	'' AS DOC_REFERENCIA,	'' AS DOC_LUGAR,	'' AS DOC_ANOMBREDE,	' ' AS DOC_IVAEXO,	'0' AS DOC_VALOREXO,	'' AS DOC_SECTOR,	'' AS DOC_DIRENTREGA,	'' AS DOC_CANTENV,	'' AS DOC_EXP,	'' AS DOC_FECHAENT,	'' AS TIPOPRODUCCION,	'0' AS DOC_TOTCOSINV,	'0' AS DOC_TOTALFIN,	'' AS USUARIOENUSO,	'0' AS DOC_IMPUESTO1,	'0' AS DOC_TOTALIMPU1,	'0' AS DOC_PORCOMI,	'0' AS DOC_DOLARES,	'' AS CODMESA,	'0' AS DOC_TIPOOPE,	' ' AS USUARIOAUTORIZA,	'0' AS NUMAUTORIZA,	'' AS FECHAAUTORIZA,	'' AS HORAAUTORIZA,	'0' AS DOC_TEMPORADA,	'0' AS DOC_INGUAT,	CONVERT(DATE,GETDATE(),102) AS FECHAINGBOD,	FORMAT (getdate(), 'hh:mm:ss') AS HORAINGBOD,	CONVERT(DATE,GETDATE(),102) AS FECHASALBOD,	FORMAT (getdate(), 'hh:mm:ss') AS HORASALBOD,	'0' AS CODVENBOD,	'' AS CODHABI,	' ' AS DOC_SERIE,	'' AS DOC_FECHAFAC,	'0' AS DOC_IVARETENIDO,	'' AS FECHARECBOD,	'' AS HORARECBOD,	'0' AS CTABAN,	'0' AS NUMINTBAN,	'' AS FECHARECEMP,	'' AS HORARECEMP,	'' AS FECHAINGEMP,	'' AS HORAINGEMP,	'' AS FECHASALEMP,	'' AS HORASALEMP,	'0' AS CODVENEMP,	'' AS FECHARECFAC,	'' AS HORARECFAC,	'' AS FECHAINGFAC,	'' AS HORAINGFAC,	'' AS FECHASALFAC,	'' AS HORASALFAC,	'' AS FECHARECENT,	'' AS HORARECENT,	'' AS FECHAINGENT,	'' AS HORAINGENT,	'' AS FECHASALENT,	'' AS HORASALENT,	'0' AS DOC_TOTCOSDOL,	'0' AS DOC_TOTCOSINVDOL,	'' AS CODUNIDAD,	'0' AS TOTCOMBUSTIBLE,	'' AS DOC_CODCONTRA,	'' AS DOC_NUMCONTRA,	'0' AS INTERES,	'0' AS ABONOINTERES,	'0' AS SALDOINTERES,	'0' AS NUMEROCORTE,	'0' AS DOC_PORLOCAL,	'' AS DOC_NUMORDEN,	'' AS DOC_FENTREGA,	'' AS DOC_INTERESADO,	'' AS DOC_RECIBE,	'0' AS NUMEROROLLO,	'' AS COD_CENTRO,	'' AS GENCUOTA,	'0' AS DOC_PORINGUAT,	'N' AS DOC_INGUATEXENTO,	'C' AS DOC_TIPOTRANIVA,	'0' AS DOC_PORTIMBREPRE,	'0' AS DOC_TIMBREPRENSA,	'0' AS ABONOSANTICIPO,	'0' AS SALDOANTICIPO,	'0' AS DOC_PRODEXENTO,	'0' AS PUNTOSGANADOS,	'0' AS PUNTOSUSADOS,	'0' AS APL_ANTICIPO,	'' AS COD_DEPARTA,	'' AS FIRMAELECTRONICA,	'' AS DOC_CODDOCRETENCION,	'' AS DOC_SERIERETENCION,	'' AS DOC_NUMRETENCION,	'' AS FIRMAISC,	'0' AS ISCENVIADO,	'' AS IDELECTRONICA,	'0' AS INTERESFAC,	'0' AS TOTAL_IDB,	'N' AS TIPO_CONSTANCIA,	'' AS NUM_CONSTANCIA,	'0' AS VALOR_CONSTANCIA,	'' AS CODDOCLIQ,	'' AS NUMDOCLIQ,	'' AS CODACTI,	'' AS GASTOLIQ,	'0' AS DOC_TOTCOSINVBOD,	'0' AS ITEM_EVENTOLIQ,	'0' AS DOC_LATITUD,	'0' AS DOC_LONGITUD,	'' AS DOC_NUMEROAPP,	'NULL' AS DOC_SERIE_A,	'NULL' AS DOC_REFFACTURA_A,	'NULL' AS FIRMAELECTRONICA_A,	'NULL' AS IDELECTRONICA_A;
	`;


  let qryDocprodEnt = qry_insert_docproductos_entrada(empnit,coddocent,correlativoentada,codprod,cantidad)

  let qryDocprod = qry_insert_docproductos_salida(empnit,coddocsal,correlativosalida, codprod,codmedida,cantidad,equivale,coddocent,correlativoentada);
 
	let qryCorrelativo = `
	UPDATE TIPODOCUMENTOS SET CORRELATIVO=${nuevocorrelativoEntrada} WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocent}';
	UPDATE TIPODOCUMENTOS SET CORRELATIVO=${nuevocorrelativoSalida} WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocsal}';
	`
	execute.Query(res,qryDocEntrada + qryDocSalida + qryDocprod + qryDocprodEnt + qryCorrelativo);

});




function qry_insert_docproductos_entrada(empnit,coddocent,correlativoent,codprod,cantidad){
  return `
  INSERT INTO [dbo].[Docproductos]
        ([EMP_NIT], [DOC_ANO], [DOC_MES], [CODDOC], [DOC_NUMERO], [DOC_ITEM], [CODPROD], [CODMEDIDA], [CANTIDAD], [EQUIVALE], [CANTIDADINV], [COSTO], [PRECIO], [TOTALCOSTO], [TOTALPRECIO], [BODEGAENTRADA], 
        [BODEGASALIDA], [SUBTOTAL], [DESCUENTOPROD], [PORDESCUPROD], [DESCUENTOFAC], [PORDESCUFAC], [TOTALDESCUENTO], [DESCRIPCION], [SUBTOTALPROD], [TIPOCAMBIO], [PRODPRECIO], [CANTIDADENVIADA], 
        [CODFAC], [NUMFAC], [ITEMFAC], [NOAFECTAINV], [PRODFVENCE], [DOCPESO], [COSTOINV], [FLETE], [TOTALPRECIOFIN], [PRECIOFIN], [TOTALCOSTOINV], [CANTIDADBONI], [CODOPR], [NUMOPR], [ITEMOPR], [CODINV], 
        [NUMINV], [ITEMINV], [TIPOCLIE], [LISTA], [PORIVA], [VALORIVA], [NOLOTE], [VALORIMPU1], [DESEMPAQUE], [SALDOINVANTCOM], [NCUENTAMESA], [CUENTACERRADA], [COSTODOL], [COSTOINVDOL], [TOTALCOSTODOL], 
        [TOTALCOSTOINVDOL], [IMPCOMBUSTIBLE], [CODVENPROD], [COMIVEN], [SOBREPRECIO], [CODREG], [NUMREG], [ITEMREG], [CANTIDADORIGINAL], [CANTIDADMODIFICADA], [NSERIETARJETA], [CODOC], [NUMOC], 
        [PORTIMBREPRENSA], [VALORTIMBREPRENSA], [CODTIPODESCU], [TOTALPUNTOS], [ITEMOC], [CODPRODORIGEN], [CODMEDIDAORIGEN], [CANTIDADDEVUELTA], [CODARANCEL], [VALOR_IDB], [POR_IDB], [PRE_IDB], 
        [CANTIDADPIEZAS], [COSTOINVBOD], [TOTCOSINVBOD], [COSTOINVCOM], [COSTOINVCOMBOD], [NITCLIEPROD], [CODPRODLEECODIGO], [CANTIDADRESERVA], [ANTICIPOPED], [CANTIDADPED], [CANTIDADINGRESADA], 
        [TOMARDATOSINV])
  SELECT  Recetas.EMP_NIT, YEAR(GETDATE()) AS DOC_ANO, MONTH(GETDATE()) AS DOC_MES, 
  '${coddocent}' AS CODDOC, 
  '${correlativoent}' AS DOC_NUMERO,
  1 AS DOC_ITEM, 
  Recetas.CODPROD, Recetas.CODMEDIDA, 
  ${cantidad} AS CANTIDAD, 
  1 AS EQUIVALE, 
                         ${cantidad} AS CANTIDADINV, 0 AS COSTO, 0 AS PRECIO, 0 AS TOTALCOSTO, 0 AS TOTALPRECIO, '' AS BODEGAENTRADA, '' AS BODEGASALIDA, 0 AS SUBTOTAL, 0 AS DESCUENTOPROD, 0 AS PORDESCUPROD, 0 AS DESCUENTOFAC, 
                         0 AS PORDESCUFAC, 0 AS TOTALDESCUENTO, Productos.DESPROD AS DESCRIPCION, 0 AS SUBTOTALPROD, 0 AS TIPOCAMBIO, 0 AS PRODPRECIO, 0 AS CANTIDADENVIADA, '' AS CODFAC, '' AS NUMFAC, 1 AS ITEMFAC, 
                         0 AS NOAFECTAINV, '' AS PRODFVENCE, 0 AS DOCPESO, 0 AS COSTOINV, 0 AS FLETE, 0 AS TOTALPRECIOFIN, 0 AS PRECIOFIN, 0 AS TOTALCOSTOINV, ${cantidad} AS CANTIDADBONI, ' ' AS CODOPR, ' ' AS NUMOPR, 0 AS ITEMOPR, 
                         ' ' AS CODINV, ' ' AS NUMINV, 0 AS ITEMINV, ' ' AS TIPOCLIE, ' ' AS LISTA, 0 AS PORIVA, 0 AS VALORIVA, 'SN' AS NOLOTE, 0 AS VALORIMPU1, '' AS DESEMPAQUE, 0 AS SALDOINVANTCOM, '' AS NCUENTAMESA, 
                         0 AS CUENTACERRADA, 0 AS COSTODOL, 0 AS COSTOINVDOL, 0 AS TOTALCOSTODOL, 0 AS TOTALCOSTOINVDOL, 0 AS IMPCOMBUSTIBLE, 0 AS CODVENPROD, 0 AS COMIVEN, 0 AS SOBREPRECIO, '' AS CODREG, '' AS NUMREG, 
                         0 AS ITEMREG, 0 AS CANTIDADORIGINAL, 0 AS CANTIDADMODIFICADA, '' AS NSERIETARJETA, '' AS CODOC, '' AS NUMOC, 0 AS PORTIMBREPRENSA, 0 AS VALORTIMBREPRENSA, '' AS CODTIPODESCU, 0 AS TOTALPUNTOS, 
                         0 AS ITEMOC, '' AS CODPRODORIGEN, '' AS CODMEDIDAORIGEN, 0 AS CANTIDADDEVUELTA, '' AS CODARANCEL, 0 AS VALOR_IDB, 0 AS POR_IDB, 0 AS PRE_IDB, 0 AS CANTIDADPIEZAS, 0 AS COSTOINVBOD, 
                         0 AS TOTCOSINVBOD, 0 AS COSTOINVCOM, 0 AS COSTOINVCOMBOD, '' AS NITCLIEPROD, '' AS CODPRODLEECODIGO, 0 AS CANTIDADRESERVA, 0 AS ANTICIPOPED, 0 AS CANTIDADPED, 0 AS CANTIDADINGRESADA, 
                         0 AS TOMARDATOSINV
FROM            Recetas LEFT OUTER JOIN
                         Productos ON Recetas.CODPROD = Productos.CODPROD AND Recetas.EMP_NIT = Productos.EMP_NIT LEFT OUTER JOIN
                         Precios ON Recetas.PCODMEDIDA = Precios.CODMEDIDA AND Recetas.PCODPROD = Precios.CODPROD AND Recetas.EMP_NIT = Precios.EMP_NIT LEFT OUTER JOIN
                         Web_Costos ON Recetas.PCODPROD = Web_Costos.CODPROD AND Recetas.EMP_NIT = Web_Costos.EMP_NIT
GROUP BY Recetas.EMP_NIT, Recetas.CODPROD, Recetas.CODMEDIDA, Productos.DESPROD
HAVING   (Recetas.EMP_NIT='${empnit}') AND  (Recetas.CODPROD = '${codprod}');
  `
};

function qry_insert_docproductos_salida(empnit,coddocsal,correlativosalida,codprod,codmedida,cantidad,equivale,coddocent,correlativoentrada){

  let str = `
      INSERT INTO [dbo].[Docproductos]
                            ([EMP_NIT], [DOC_ANO], [DOC_MES], [CODDOC], [DOC_NUMERO], [DOC_ITEM], [CODPROD], [CODMEDIDA], [CANTIDAD], [EQUIVALE], [CANTIDADINV], [COSTO], [PRECIO], [TOTALCOSTO], [TOTALPRECIO], [BODEGAENTRADA], 
                            [BODEGASALIDA], [SUBTOTAL], [DESCUENTOPROD], [PORDESCUPROD], [DESCUENTOFAC], [PORDESCUFAC], [TOTALDESCUENTO], [DESCRIPCION], [SUBTOTALPROD], [TIPOCAMBIO], [PRODPRECIO], [CANTIDADENVIADA], 
                            [CODFAC], [NUMFAC], [ITEMFAC], [NOAFECTAINV], [PRODFVENCE], [DOCPESO], [COSTOINV], [FLETE], [TOTALPRECIOFIN], [PRECIOFIN], [TOTALCOSTOINV], [CANTIDADBONI], [CODOPR], [NUMOPR], [ITEMOPR], [CODINV], 
                            [NUMINV], [ITEMINV], [TIPOCLIE], [LISTA], [PORIVA], [VALORIVA], [NOLOTE], [VALORIMPU1], [DESEMPAQUE], [SALDOINVANTCOM], [NCUENTAMESA], [CUENTACERRADA], [COSTODOL], [COSTOINVDOL], [TOTALCOSTODOL], 
                            [TOTALCOSTOINVDOL], [IMPCOMBUSTIBLE], [CODVENPROD], [COMIVEN], [SOBREPRECIO], [CODREG], [NUMREG], [ITEMREG], [CANTIDADORIGINAL], [CANTIDADMODIFICADA], [NSERIETARJETA], [CODOC], [NUMOC], 
                            [PORTIMBREPRENSA], [VALORTIMBREPRENSA], [CODTIPODESCU], [TOTALPUNTOS], [ITEMOC], [CODPRODORIGEN], [CODMEDIDAORIGEN], [CANTIDADDEVUELTA], [CODARANCEL], [VALOR_IDB], [POR_IDB], [PRE_IDB], 
                            [CANTIDADPIEZAS], [COSTOINVBOD], [TOTCOSINVBOD], [COSTOINVCOM], [COSTOINVCOMBOD], [NITCLIEPROD], [CODPRODLEECODIGO], [CANTIDADRESERVA], [ANTICIPOPED], [CANTIDADPED], [CANTIDADINGRESADA], 
                            [TOMARDATOSINV])
      SELECT  RECETAS.EMP_NIT, 
                            YEAR(GETDATE()) AS DOC_ANO, 
                            MONTH(GETDATE()) AS DOC_MES, 
                            '${coddocsal}' AS CODDOC, 
                            '${correlativosalida}' AS DOC_NUMERO, 
                            ROW_NUMBER() OVER( ORDER BY (select PCODPROD)) AS DOC_ITEM, 
                            Recetas.PCODPROD AS CODPROD, 
                            Recetas.PCODMEDIDA AS CODMEDIDA, 
                            ROUND(Recetas.PCANTIDAD*${cantidad},2) AS CANTIDAD, 
                            1 AS EQUIVALE, 
                            ROUND(Recetas.PCANTIDAD*${cantidad},2) AS CANTIDADINV, 
                            Web_Costos.COSTO, 
                            Precios.PRECIO, 
                            ROUND(Web_Costos.COSTO * Recetas.PCANTIDAD*${cantidad}, 2) AS TOTALCOSTO, 
                            ROUND(Precios.PRECIO * Recetas.PCANTIDAD*${cantidad}, 2) AS TOTALPRECIO, 
                            '' AS BODEGAENTRADA, 
                            Recetas.CODBODEGA AS BODEGASALIDA, 
                            0 AS SUBTOTAL, 
                            0 AS DESCUENTOPROD, 
                            0 AS PORDESCUPROD, 
                            0 AS DESCUENTOFAC, 
                            0 AS PORDESCUFAC, 0 AS TOTALDESCUENTO, 
                            DESPROD AS DESCRIPCION, 
                            ROUND(Precios.PRECIO * Recetas.PCANTIDAD*${cantidad}, 2) AS SUBTOTALPROD, 
                            0 AS TIPOCAMBIO, 0 AS PRODPRECIO, 0 AS CANTIDADENVIADA, 
                            '${coddocent}' AS CODFAC, '${correlativoentrada}' AS NUMFAC, 
                            1 AS ITEMFAC, 
                            0 AS NOAFECTAINV, '' AS PRODFVENCE, 0 AS DOCPESO, 
                            costoinv AS COSTOINV, 
                            0 AS FLETE, 
                            0 AS TOTALPRECIOFIN, 
                            0 AS PRECIOFIN, 
                            ROUND((PCANTIDAD*COSTOINV*${cantidad}),2) AS TOTALCOSTOINV, 
                            0 AS CANTIDADBONI, ' ' AS CODOPR, 
                            ' ' AS NUMOPR, 0 AS ITEMOPR, ' ' AS CODINV, ' ' AS NUMINV, 0 AS ITEMINV, ' ' AS TIPOCLIE, ' ' AS LISTA, 
                            0 AS PORIVA, 0 AS VALORIVA, 'SN' AS NOLOTE, 0 AS VALORIMPU1, '' AS DESEMPAQUE, 
                            0 AS SALDOINVANTCOM, 
                            '' AS NCUENTAMESA, 0 AS CUENTACERRADA, 
                            CASE WHEN Web_Costos.COSTO=0 THEN 0 ELSE ROUND(((Web_Costos.COSTO)/7.80),2) END AS COSTODOL, 
                            CASE WHEN WEB_COSTOS.COSTOINV=0 THEN 0 ELSE ROUND(((WEB_COSTOS.COSTOINV)/7.80),2) END AS COSTOINVDOL, 
                            CASE WHEN Web_Costos.COSTO=0 THEN 0 ELSE ROUND(((Web_Costos.COSTO*PCANTIDAD)*${cantidad}/7.80),2) END AS TOTALCOSTODOL, 
                            CASE WHEN WEB_COSTOS.COSTOINV=0 THEN 0 ELSE ROUND(((WEB_COSTOS.COSTOINV*PCANTIDAD)*${cantidad}/7.80),2) END AS TOTALCOSTOINVDOL, 
                            0 AS IMPCOMBUSTIBLE, 0 AS CODVENPROD, 0 AS COMIVEN, 
                            0 AS SOBREPRECIO, '' AS CODREG, '' AS NUMREG, 0 AS ITEMREG, 0 AS CANTIDADORIGINAL, 0 AS CANTIDADMODIFICADA, 
                            '' AS NSERIETARJETA, '' AS CODOC, '' AS NUMOC, 0 AS PORTIMBREPRENSA, 
                            0 AS VALORTIMBREPRENSA, '' AS CODTIPODESCU, 0 AS TOTALPUNTOS, 0 AS ITEMOC, 
                            PCODPROD AS CODPRODORIGEN, PCODMEDIDA AS CODMEDIDAORIGEN, 0 AS CANTIDADDEVUELTA, '' AS CODARANCEL, 0 AS VALOR_IDB, 
                            0 AS POR_IDB, 0 AS PRE_IDB, 0 AS CANTIDADPIEZAS, 0 AS COSTOINVBOD, 0 AS TOTCOSINVBOD, 0 AS COSTOINVCOM, 0 AS COSTOINVCOMBOD, 
                            '' AS NITCLIEPROD, '' AS CODPRODLEECODIGO, 0 AS CANTIDADRESERVA, 
                            0 AS ANTICIPOPED, 0 AS CANTIDADPED, 0 AS CANTIDADINGRESADA, 0 AS TOMARDATOSINV
          FROM  Recetas LEFT OUTER JOIN
                                                                  Productos ON Recetas.PCODPROD = Productos.CODPROD AND Recetas.EMP_NIT = Productos.EMP_NIT LEFT OUTER JOIN
                                                                  Precios ON Recetas.PCODMEDIDA = Precios.CODMEDIDA AND Recetas.PCODPROD = Precios.CODPROD AND Recetas.EMP_NIT = Precios.EMP_NIT LEFT OUTER JOIN
                                                                  Web_Costos ON Recetas.PCODPROD = Web_Costos.CODPROD AND Recetas.EMP_NIT = Web_Costos.EMP_NIT
          WHERE   (Recetas.EMP_NIT = '${empnit}') AND   (Recetas.CODPROD = '${codprod}');
      `;
  
  return str;

};


router.post("/ordenes_eliminar", async(req,res)=>{

	const {empnit,coddocent,correlativoent,coddocsal,correlativosal,clave} = req.body;

	let qryX = ` DELETE FROM DOCUMENTOS WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocent}' AND DOC_NUMERO='${correlativoent}';
              DELETE FROM DOCUMENTOS WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocsal}' AND DOC_NUMERO='${correlativosal}'; 
              DELETE FROM TEMP_PRODUCCION WHERE CODDOC='${coddocent}' AND DOC_NUMERO='${correlativoent}';`;
	

              

	let qry = ` DELETE FROM DOCPRODUCTOS WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocent}' AND DOC_NUMERO='${correlativoent}';
              DELETE FROM DOCPRODUCTOS WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocsal}' AND DOC_NUMERO='${correlativosal}';
              DELETE FROM DOCUMENTOS WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocent}' AND DOC_NUMERO='${correlativoent}';
              DELETE FROM DOCUMENTOS WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocsal}' AND DOC_NUMERO='${correlativosal}'; 
  `;

	execute.Query(res,qry);

});


router.post("/login", async(req,res)=>{

	const {empnit,usuario,clave} = req.body;

  let qryU = `SELECT NOMBRE FROM USUARIOS WHERE NOMBRE='${usuario}' AND CLAVE='${clave}';`;

  

  
	let qry = `SELECT 
					dbo.Usuarios.NOMBRE AS USUARIO, 
					dbo.Usuarios.CLAVE, 
					dbo.UsuariosConf.EMP_NIT AS EMPNIT, 
					dbo.UsuariosConf.TIPOOPERACION, 
					dbo.UsuariosConf.NOMOPERACION, 
					dbo.Tipodocumentos.CODDOCSAL, 
					dbo.Tipodocumentos.TIPODOC, 
					dbo.Tipodocumentos.CORRELATIVO
			FROM  dbo.Tipodocumentos RIGHT OUTER JOIN
				dbo.UsuariosConf ON dbo.Tipodocumentos.CODDOC = dbo.UsuariosConf.NOMOPERACION AND dbo.Tipodocumentos.EMP_NIT = dbo.UsuariosConf.EMP_NIT RIGHT OUTER JOIN
				dbo.Usuarios ON dbo.UsuariosConf.CLAVE = dbo.Usuarios.NOMBRE
			WHERE (dbo.Usuarios.PRODUCCION = 'SI') AND (dbo.Usuarios.NOMBRE='${usuario}') AND (dbo.Usuarios.CLAVE='${clave}')`;
	
	execute.Query(res,qryU);

});

router.post("/recetas", async(req,res)=>{

	const {empnit,codclatres,tabla,valor} = req.body;

  let qry = '';

  if(codclatres=='TODOS'){
    qry = `
SELECT        Productos.EMP_NIT, Productos.CODPROD, Productos.DESPROD, Precios.CODMEDIDA, Precios.EQUIVALE, COUNT(Recetas.PCODPROD) AS Receta
FROM            Productos LEFT OUTER JOIN
                         Recetas ON Productos.CODPROD = Recetas.CODPROD AND Productos.EMP_NIT = Recetas.EMP_NIT LEFT OUTER JOIN
                         Precios ON Productos.CODPROD = Precios.CODPROD AND Productos.EMP_NIT = Precios.EMP_NIT
 WHERE (Productos.EMP_NIT = '${empnit}') AND (Productos.${tabla} = '${valor}') AND (Productos.NOHABILITADO=0)
GROUP BY Productos.EMP_NIT, Productos.CODPROD, Productos.DESPROD, Precios.CODMEDIDA, Precios.EQUIVALE
HAVING        (NOT (COUNT(Recetas.PCODPROD) IN (0)))`;


  }else{
    qry = `
SELECT        Productos.EMP_NIT, Productos.CODPROD, Productos.DESPROD, Precios.CODMEDIDA, Precios.EQUIVALE, COUNT(Recetas.PCODPROD) AS Receta
FROM            Productos LEFT OUTER JOIN
                         Recetas ON Productos.CODPROD = Recetas.CODPROD AND Productos.EMP_NIT = Recetas.EMP_NIT LEFT OUTER JOIN
                         Precios ON Productos.CODPROD = Precios.CODPROD AND Productos.EMP_NIT = Precios.EMP_NIT
WHERE (Productos.EMP_NIT = '${empnit}') AND (Productos.CODCLATRES = '${codclatres}') AND (Productos.NOHABILITADO=0)
GROUP BY Productos.EMP_NIT, Productos.CODPROD, Productos.DESPROD, Precios.CODMEDIDA, Precios.EQUIVALE
HAVING        (NOT (COUNT(Recetas.PCODPROD) IN (0)))`;

  }

	

	execute.Query(res,qry);

});


router.post("/productos_receta", async(req,res)=>{

  const {empnit,codprod,coddoc,correlativo,micro_macro} = req.body;

 
  let qry = '';

  if(micro_macro=='TODOS'){
    qry = `
    SELECT        Docproductos.DOC_ITEM AS ID, Docproductos.CODPROD AS PCODPROD, Docproductos.DESCRIPCION AS DESPROD, Docproductos.CODMEDIDA AS PCODMEDIDA, ROUND((Docproductos.CANTIDAD),2) AS PCANTIDAD, 
                           Docproductos.COSTO AS PCOSTO, ROUND((Docproductos.CANTIDADINV),2) AS PROD_UNIDADES, Docproductos.CANTIDADENVIADA AS PROD_UN_PESADAS, Web_Existencias.SALDOFINAL
  FROM            Docproductos LEFT OUTER JOIN
                           Web_Existencias ON Docproductos.CODPROD = Web_Existencias.CODPROD AND Docproductos.EMP_NIT = Web_Existencias.EMP_NIT LEFT OUTER JOIN
                           Productos ON Docproductos.CODPROD = Productos.CODPROD AND Docproductos.EMP_NIT = Productos.EMP_NIT
  WHERE        (Docproductos.EMP_NIT = '${empnit}') AND (Docproductos.CODDOC = '${coddoc}') AND (Docproductos.DOC_NUMERO = '${correlativo}')
  ORDER BY DOCPRODUCTOS.CANTIDADENVIADA, DOCPRODUCTOS.CODPROD
    `
  }else{
    qry = `
    SELECT        Docproductos.DOC_ITEM AS ID, Docproductos.CODPROD AS PCODPROD, Docproductos.DESCRIPCION AS DESPROD, Docproductos.CODMEDIDA AS PCODMEDIDA, ROUND((Docproductos.CANTIDAD),2) AS PCANTIDAD, 
                           Docproductos.COSTO AS PCOSTO, ROUND((Docproductos.CANTIDADINV),2) AS PROD_UNIDADES, Docproductos.CANTIDADENVIADA AS PROD_UN_PESADAS, Web_Existencias.SALDOFINAL
  FROM            Docproductos LEFT OUTER JOIN
                           Web_Existencias ON Docproductos.CODPROD = Web_Existencias.CODPROD AND Docproductos.EMP_NIT = Web_Existencias.EMP_NIT LEFT OUTER JOIN
                           Productos ON Docproductos.CODPROD = Productos.CODPROD AND Docproductos.EMP_NIT = Productos.EMP_NIT
  WHERE        (Docproductos.EMP_NIT = '${empnit}') AND (Docproductos.CODDOC = '${coddoc}') AND (Docproductos.DOC_NUMERO = '${correlativo}') AND (Productos.CODCLADOS = '${micro_macro}')
  ORDER BY PROD_UN_PESADAS, PCODPROD
    `
  }

  


	execute.Query(res,qry);

});




router.post("/update_peso_producto", async(req,res)=>{

	const {empnit,id,peso,coddocsal,correlativosal} = req.body;

  //const {empnit,coddoc,doc_numero,codprod,peso} = req.body;

	let qry = `UPDATE DOCPRODUCTOS SET CANTIDADENVIADA=${peso} 
          WHERE EMP_NIT='${empnit}' AND CODDOC='${coddocsal}' AND DOC_NUMERO='${correlativosal}' AND DOC_ITEM=${id};
	`;

  

	execute.Query(res,qry);

});






router.post("/tipodocumentos_correlativo", async(req,res)=>{

	const {empnit,coddoc,tipo} = req.body;

	let qry = `
		SELECT CODDOC, CORRELATIVO 
			FROM TIPODOCUMENTOS 
			WHERE EMP_NIT = '${empnit}'
			AND CODDOC='${coddoc}'
	`

	execute.Query(res,qry);

});

router.post("/tipodocumentos_coddoc", async(req,res)=>{

	const {empnit,tipo} = req.body;

	let qry = `
		SELECT CODDOC, CORRELATIVO, DESDOC 
			FROM TIPODOCUMENTOS 
			WHERE EMP_NIT = '${empnit}'
			AND TIPODOC='${tipo}'
	`

	execute.Query(res,qry);

});

router.post("/tipodocumentos_coddoc_salida", async(req,res)=>{

	const {empnit,coddoc} = req.body;

	let qry = `
		SELECT CODDOCSAL 
			FROM TIPODOCUMENTOS 
			WHERE EMP_NIT = '${empnit}'
			AND CODDOC='${coddoc}'
	`

	execute.Query(res,qry);

});





function getCorrelativo_isc(correlativo){
	let numdoc = '';

	switch (correlativo.toString().length) {
		case 1:
			numdoc = '         ' + correlativo;
		break;
		case 2:
			numdoc = '        ' + correlativo;
		break;
		case 3:
			numdoc = '       ' + correlativo;
		break;
		case 4:
			numdoc = '      ' + correlativo;
			break;
		case 5:
			numdoc = '     ' + correlativo;
			break;
		case 6:
			numdoc = '    ' + correlativo;
			break;
		case 7:
			numdoc = '   ' + correlativo;
			break;
		case 8:
			numdoc = '  ' + correlativo;
		break;
		case 9:
			numdoc = ' ' + correlativo;
		break;
		case 10:
			numdoc = correlativo;
		break;
		default:
			break;
	};

	return numdoc;

};



function insert_docproductos(empnit,coddocsal,correlativosalida,item,codprod,desprod,codmedida,equivale,cantidad,costoun,precioun,coddocent,correlativoent,fcodprod,fcodmedida){

  let str = `
      INSERT INTO [dbo].[Docproductos]
                            ([EMP_NIT], [DOC_ANO], [DOC_MES], [CODDOC], [DOC_NUMERO], [DOC_ITEM], [CODPROD], [CODMEDIDA], [CANTIDAD], [EQUIVALE], [CANTIDADINV], [COSTO], [PRECIO], [TOTALCOSTO], [TOTALPRECIO], [BODEGAENTRADA], 
                            [BODEGASALIDA], [SUBTOTAL], [DESCUENTOPROD], [PORDESCUPROD], [DESCUENTOFAC], [PORDESCUFAC], [TOTALDESCUENTO], [DESCRIPCION], [SUBTOTALPROD], [TIPOCAMBIO], [PRODPRECIO], [CANTIDADENVIADA], 
                            [CODFAC], [NUMFAC], [ITEMFAC], [NOAFECTAINV], [PRODFVENCE], [DOCPESO], [COSTOINV], [FLETE], [TOTALPRECIOFIN], [PRECIOFIN], [TOTALCOSTOINV], [CANTIDADBONI], [CODOPR], [NUMOPR], [ITEMOPR], [CODINV], 
                            [NUMINV], [ITEMINV], [TIPOCLIE], [LISTA], [PORIVA], [VALORIVA], [NOLOTE], [VALORIMPU1], [DESEMPAQUE], [SALDOINVANTCOM], [NCUENTAMESA], [CUENTACERRADA], [COSTODOL], [COSTOINVDOL], [TOTALCOSTODOL], 
                            [TOTALCOSTOINVDOL], [IMPCOMBUSTIBLE], [CODVENPROD], [COMIVEN], [SOBREPRECIO], [CODREG], [NUMREG], [ITEMREG], [CANTIDADORIGINAL], [CANTIDADMODIFICADA], [NSERIETARJETA], [CODOC], [NUMOC], 
                            [PORTIMBREPRENSA], [VALORTIMBREPRENSA], [CODTIPODESCU], [TOTALPUNTOS], [ITEMOC], [CODPRODORIGEN], [CODMEDIDAORIGEN], [CANTIDADDEVUELTA], [CODARANCEL], [VALOR_IDB], [POR_IDB], [PRE_IDB], 
                            [CANTIDADPIEZAS], [COSTOINVBOD], [TOTCOSINVBOD], [COSTOINVCOM], [COSTOINVCOMBOD], [NITCLIEPROD], [CODPRODLEECODIGO], [CANTIDADRESERVA], [ANTICIPOPED], [CANTIDADPED], [CANTIDADINGRESADA], 
                            [TOMARDATOSINV])
      VALUES 
          ('${empnit}', 	
            YEAR(GETDATE()), 	MONTH(GETDATE()), 	
            '${coddocsal}','${correlativosalida}', 	
            ${item}, 	
            '${codprod}', 	
            '${codmedida}', 	
            ${cantidad}, 	
            ${equivale}, 	
            ${Number(cantidad) * Number(equivale)}', 	
            ${costoun}, 	
            ${precioun}, 	
            ${(Number(cantidad) * Number(equivale)) * Number(costoun)}, 	
            ${(Number(cantidad) * Number(equivale)) * Number(precioun)},  	
            '', 	'BOD-00', 0, 	0, 	0, 	0, 	0, 	0, 	
            ${desprod}, 	 	
            ${(Number(cantidad) * Number(equivale)) * Number(precioun)}, , 	
            0, 	0, 	0, 	
            '${coddocent}', 	
            '${correlativoent}', 	
            1 AS ITEMFAC, 	
            0, 	'', 	0, 	
            ${costoun}, 	
            0, 	0, 	0, 	
            ${(Number(cantidad) * Number(equivale)) * Number(costoun)}, 	
            0, 	' ', 	' ', 	0, 	' ', 	' ', 	
            0, 	' ', 	' ', 	0 AS PORIVA, 	0 AS VALORIVA, 	'SN' AS NOLOTE, 	
            0 AS VALORIMPU1, 	'' AS DESEMPAQUE, 	0 AS SALDOINVANTCOM, 	'' AS NCUENTAMESA, 	0 AS CUENTACERRADA, 	
            ${Number(costoun)/7.8}, 	
            ${Number(costoun)/7.8}, 	
            ${((Number(cantidad) * Number(equivale)) * Number(costoun))/7.8}, 	
            ${((Number(cantidad) * Number(equivale)) * Number(costoun))/7.8}, 	
            0, 	0, 	0 AS COMIVEN, 	0 AS SOBREPRECIO, 	'' AS CODREG, 	'' AS NUMREG, 	
            0 AS ITEMREG, 	0 AS CANTIDADORIGINAL, 	0 AS CANTIDADMODIFICADA, 	'' AS NSERIETARJETA, 	'' AS CODOC, 	'' AS NUMOC, 	
            0 AS PORTIMBREPRENSA, 	0 AS VALORTIMBREPRENSA, 	'' AS CODTIPODESCU, 	0 AS TOTALPUNTOS, 	0 AS ITEMOC, 	
            '${fcodprod}' AS CODPRODORIGEN, 	
            '${fcodmedida}' AS CODMEDIDAORIGEN, 	
            0 AS CANTIDADDEVUELTA, 	'' AS CODARANCEL, 	0 AS VALOR_IDB, 	0 AS POR_IDB, 	0 AS PRE_IDB, 	0 AS CANTIDADPIEZAS, 	
            0 AS COSTOINVBOD, 	0 AS TOTCOSINVBOD, 	0 AS COSTOINVCOM, 	0 AS COSTOINVCOMBOD, 	'' AS NITCLIEPROD, 	
            '' AS CODPRODLEECODIGO, 	0 AS CANTIDADRESERVA, 	0 AS ANTICIPOPED, 	0 AS CANTIDADPED, 	0 AS CANTIDADINGRESADA, 	
            0 AS TOMARDATOSINV);
      `;
  
  return str;

};

module.exports = router;