import { LandingRoutes } from "@/routes/route";
import { ApiCore } from "@/config/api-core";
import { LandingRegisterRequestDTO, LandingRegisterResponseDTO } from "./dto/landing.dto";

export const LandingRegister = async (payload: LandingRegisterRequestDTO): Promise<LandingRegisterResponseDTO> => {
    const { lastName, firstName, email, position, socialMedia, language } = payload;
    return await ApiCore(LandingRoutes.register, {
        method: "POST",
        body: JSON.stringify({
            lastName: lastName,
            firstName: firstName,
            email: email,
            position: position,
            socialMedia: socialMedia,
            language: language
        })
    });
}