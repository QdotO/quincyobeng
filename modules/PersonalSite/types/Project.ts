export default interface Project {
    title: string
    role: string
    section: string
    tenure: {
        start: string
        finish: string
    }
    languages: string[]
    technology: string
    supportingTechnologies?: string[]
}
