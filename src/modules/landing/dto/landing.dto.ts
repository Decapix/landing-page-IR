export type LandingRegisterRequestDTO = {
    lastName: string;
    firstName: string;
    email: string;
    position: string;
    socialMedia: string;
    language: string;
}

export type LandingRegisterResponseDTO = {
    success: boolean;
    status: number;
    message: string;
    data: LandingRegisterRequestDTO;
}