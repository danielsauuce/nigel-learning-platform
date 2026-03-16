import { useMemo, useState } from 'react';
import { STUDENTS } from '../../data/students';

export function useStudentRoster() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active'>('all');

  const filtered = useMemo(() => {
    let list = STUDENTS;

    if (filter === 'active') {
      list = list.filter((s) => s.active);
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }

    return list;
  }, [search, filter]);

  return {
    search,
    setSearch,
    filter,
    setFilter,
    filtered,
  };
}
