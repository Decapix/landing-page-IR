export type LandingRegisterRequestDTO = {
    lastName: string;
    firstName: string;
    email: string;
    position: string;
    socialMedia: string;
    language: string;
    // Optional fields for contact usage
    message?: string;
    company?: string; // honeypot (must be empty)
}

export type LandingRegisterResponseDTO = {
    success: boolean;
    status: number;
    message: string;
    data: LandingRegisterRequestDTO;
}