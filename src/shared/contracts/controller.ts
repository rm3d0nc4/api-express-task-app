interface Controller<Req, Res, Next> {
    handle(req: Req, res: Res, next?: Next): Promise<Res>;
}

export {Controller}