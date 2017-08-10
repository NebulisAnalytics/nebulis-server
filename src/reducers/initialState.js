export default function getInitialState() {
	return {
		error: null,
		loading: false,
		projects: [],
    isAddingProject: false,
		project: null,
		teams: null,
		team: {},
		downloading:false
	}
}
