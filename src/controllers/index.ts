export class MainController {
    public getMain(req: Request, res: Response): void {
        res.send("Welcome to the main route!");
    }
}