const BadRequestException = require("../../common/exceptions/badRequestException");
const responseParserHandler = require("../handlers/responseParserHandler");
const httpStatusCodesConstants = require("../../common/constants/httpStatusCodesConstants");

const isWookieeFormat = (req) => {
	return req.query.format === "wookiee";
};

const applySwapiEndpoints = (server, app) => {
	const service = app.services.swapiService;
	server.get("/hfswapi/getPeople/:id", async (req, res, next) => {
		try {
			const idPathParam = req.params.id;
			if (!idPathParam || idPathParam.length === 0) {
				throw new BadRequestException(
					"People id param were not present in request."
				);
			}
			const result = await service.getPeopleById(idPathParam);
			responseParserHandler(httpStatusCodesConstants.OK, result, res);
		} catch (error) {
			next(error);
		}
	});
	server.get("/hfswapi/getPlanet/:id", async (req, res, next) => {
		try {
			const idPathParam = req.params.id;
			if (!idPathParam || idPathParam.length === 0) {
				throw new BadRequestException(
					"Planet id param were not present in request."
				);
			}
			const result = await service.getPlanetById(idPathParam);
			responseParserHandler(httpStatusCodesConstants.OK, result, res);
		} catch (error) {
			next(error);
		}
	});
	server.get("/hfswapi/getWeightOnPlanetRandom", async (req, res, next) => {
		try {
			const result = await service.getWeightOnPlanetRandom();
			responseParserHandler(httpStatusCodesConstants.OK, result, res);
		} catch (error) {
			next(error);
		}
	});

	server.get("/hfswapi/getLogs", async (req, res) => {
		const data = await app.db.logging.findAll();
		res.send(data);
	});
};

module.exports = applySwapiEndpoints;
