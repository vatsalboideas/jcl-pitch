import { notFound } from 'next/navigation';
import DetailPage from '@/src/components/detailPage';
import { getProjectById } from '@/src/data/projects';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectById(params.slug);

  if (!project) {
    notFound();
  }

  return <DetailPage project={project} />;
}

export function generateStaticParams() {
  return [{ slug: 'nmacc' }, { slug: 'project2' }, { slug: 'project3' }];
}
