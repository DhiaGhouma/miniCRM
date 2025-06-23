"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Tag as TagIcon } from 'lucide-react';
import { useCRMStore, Tag } from '@/lib/store';
import { cn } from '@/lib/utilis';

interface TagInputProps {
  clientId: string;
  selectedTags: string[];
  onTagsChange?: (tags: string[]) => void;
  className?: string;
}

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-red-100 text-red-800',
  'bg-orange-100 text-orange-800',
  'bg-pink-100 text-pink-800',
  'bg-indigo-100 text-indigo-800',
  'bg-yellow-100 text-yellow-800',
];

export default function TagInput({ clientId, selectedTags, onTagsChange, className }: TagInputProps) {
  const { tags, addTag, addTagToClient, removeTagFromClient } = useCRMStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(tagColors[0]);

  const availableTags = tags.filter(tag => !selectedTags.includes(tag.id));

  const handleAddExistingTag = (tagId: string) => {
    addTagToClient(clientId, tagId);
    onTagsChange?.([ ...selectedTags, tagId]);
  };

  const handleRemoveTag = (tagId: string) => {
    removeTagFromClient(clientId, tagId);
    onTagsChange?.(selectedTags.filter(id => id !== tagId));
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      addTag({
        name: newTagName.trim(),
        color: selectedColor
      });
      setNewTagName('');
      setIsCreating(false);
    }
  };

  const getTagById = (id: string): Tag | undefined => {
    return tags.find(tag => tag.id === id);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tagId) => {
          const tag = getTagById(tagId);
          if (!tag) return null;
          
          return (
            <Badge
              key={tagId}
              className={cn("flex items-center gap-1", tag.color)}
            >
              <TagIcon className="h-3 w-3" />
              {tag.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveTag(tagId)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>

      {/* Add Tags Section */}
      <div className="space-y-2">
        {/* Existing Tags Dropdown */}
        {availableTags.length > 0 && (
          <Select onValueChange={handleAddExistingTag}>
            <SelectTrigger className="bg-slate-50 border-slate-300">
              <SelectValue placeholder="Ajouter un tag existant..." />
            </SelectTrigger>
            <SelectContent>
              {availableTags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-3 h-3 rounded-full", tag.color.split(' ')[0])} />
                    {tag.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Create New Tag */}
        {!isCreating ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreating(true)}
            className="bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer un nouveau tag
          </Button>
        ) : (
          <div className="flex gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Nom du tag..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="bg-white border-slate-300"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateTag()}
              />
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="bg-white border-slate-300">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", selectedColor.split(' ')[0])} />
                      Couleur
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {tagColors.map((color, index) => (
                    <SelectItem key={index} value={color}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", color.split(' ')[0])} />
                        {color.includes('blue') && 'Bleu'}
                        {color.includes('green') && 'Vert'}
                        {color.includes('purple') && 'Violet'}
                        {color.includes('red') && 'Rouge'}
                        {color.includes('orange') && 'Orange'}
                        {color.includes('pink') && 'Rose'}
                        {color.includes('indigo') && 'Indigo'}
                        {color.includes('yellow') && 'Jaune'}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Button
                size="sm"
                onClick={handleCreateTag}
                disabled={!newTagName.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsCreating(false);
                  setNewTagName('');
                }}
                className="border-slate-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}