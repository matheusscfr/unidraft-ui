export const API_URL = "https://faculdade-back-end-production.up.railway.app/";

export function AUTH_DASH() { 
    return {
      url: API_URL + "recrutadores/login",
  };
}

export function USER_ID(userid: string | undefined) {
    return {
        url: API_URL + "users/" + userid,
    }
}

export function GET_ALL_STUDENT() {
    return {
        url: API_URL + "aluno"
    }
}

export function NEW_RECRUITER() {
    return {
        url: API_URL + "recrutadores"
    }
}

export function NEW_SOLICITATION(recrutador_id: string | undefined) {
    return {
        url: API_URL + "recrutadores/oferta-contratacao/" + recrutador_id
    }
}

export function GET_ALL_ENTERPRISE() {
    return {
        url: API_URL + "empresa"
    }
}

export function  GET_ALL_QUESTIONS(userid: string | undefined) {
    return {
        url: API_URL + "university/unanswered/" + userid
    }
}

export function  GET_ONE_QUESTIONS(id_question: string | undefined) {
    return {
        url: API_URL + "university/question/" + id_question
    }
}

export function MARK_ANSWER(id_answer: string | undefined) {
    return {
        url: API_URL + "university/answer/" + id_answer
    }
}