import {createFileRoute} from '@tanstack/react-router'

const Index = () => {
	return <div className={'p-3'}>
	</div>
}


export const Route = createFileRoute('/')({
	component: Index
})