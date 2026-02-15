export default class Env {
    // Fail fast if ENV variables are missing
    public static readonly BASE_URL: string = process.env.BASE_URL!;

    // Mapping 'Admin' role to 'standard_user' for demo purposes
    public static readonly ADMIN_USER: string = process.env.ADMIN_USER!
    public static readonly ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD!

    // Mapping 'Standard User' role to 'visual_user' (See how they see different images/UI)
    public static readonly STANDARD_USER: string = process.env.STANDARD_USER!
    public static readonly STANDARD_PASSWORD: string = process.env.STANDARD_PASSWORD!
}
