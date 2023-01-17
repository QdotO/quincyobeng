import Project from './Project'

export default interface Company {
    name: string
    tenure: {
        start: string
        finish: string
        projects: Project[]
    }
}
